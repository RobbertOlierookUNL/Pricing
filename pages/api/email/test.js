import XLSX from "xlsx-style";
import XLSX1 from "xlsx";

import { excelText, mailHtml, mailText } from "../../../lib/text";
import {unilever_blue} from "../../../lib/colors";




const createAndSendMail = (transporter, arrayOfObjects, category, retailer) => new Promise(function(resolve, reject) {
	const newArrayOfObjects = [
		{
			offset: "",
			EAN: "EAN",
			Productomschrijving: "Productomschrijving",
			RSP: "RSP",
			Adviesprijs: "Adviesprijs",
			Marge: "Marge",
		},
		...arrayOfObjects
	];
	const tl = XLSX1.utils.json_to_sheet(newArrayOfObjects);
	const range = XLSX.utils.decode_range(tl["!ref"]);
	range.s.r = 1;
	range.s.c = 1;
	const endRow = {...range.e}.r;
	range.e.r += 7;
	const textRow = range.e.r;
	console.log({range});
	tl["!ref"] = XLSX.utils.encode_range(range);
	tl["!cols"] = [{wch: 2}, {wch: 13}, {wch: 50}, {wch: 13}, {wch: 13}, {wch: 13}];
	tl["!merges"] = [{s: {c: 1, r: textRow - 3}, e: {c: 5, r: textRow}}];

	const styledTl = {};
	Object.entries(tl).map(([key, value]) => {
		const cell = XLSX.utils.decode_cell(key);
		const col = cell.c;
		const row = cell.r;
		if (col === 1) {
			value = {...value, s: {
				border: {
					left: { style: "thin", color: { auto: 1 } },
				}
			}
			};
		}
		if (col === 3 || col === 4 ) {
			value = {...value, z: "€0.00"};
		}
		if (col === 5) {
			value = {...value, s: {
				border: {
					right: { style: "thin", color: { auto: 1 } },
				}
			},
			z: "€#,##0"
			};
		}
		if (row === endRow) {
			value = {...value, s: {
				border: {
					...value?.s?.border,
					bottom: { style: "thin", color: { auto: 1 } },
				}
			}
			};
		}
		if (row === 1) {
			value = {...value, s: {
				fill: {
					patternType: "solid",
					fgColor: { rgb: unilever_blue.color.slice(1) },
				},
				font: {
					sz: 16,
					color: { rgb: "FFFFFF" },
					bold: true,
					italic: false,
					underline: false
				},
				border: {
					...value?.s?.border,
					top: { style: "thin", color: { auto: 1 } },
				}
			}
			};
		} else if (col > 0 && row > 0 && row <= endRow) {
			if (row % 2) {
				value = {...value, s: {
					...value?.s,
					fill: {
						patternType: "solid",
						fgColor: { rgb: "DDDDDD" },
					},
				}
				};
			} else {
				value = {...value, s: {
					...value?.s,
					fill: {
						patternType: "solid",
						fgColor: { rgb: "FFFFFF" },
					},
				}

				};
			}
			console.log({value});

		}

		styledTl[key] = value;
	});
	const textKey = XLSX.utils.encode_cell({c: 1, r: textRow-3});
	const textKey2 = XLSX.utils.encode_cell({c: 1, r: textRow-2});
	const textKey3 = XLSX.utils.encode_cell({c: 1, r: textRow-1});
	const textKey4 = XLSX.utils.encode_cell({c: 1, r: textRow});


	styledTl[textKey] = {
		v: excelText,
		t: "s",
		s: {
			alignment: {
				wrapText: "1",
			},
			border: {
				left: { style: "thick", color: { rgb: unilever_blue.color.slice(1) } },

			}
		}
	};
	styledTl[textKey2] = {
		s: {
			border: {
				left: { style: "thick", color: { rgb: unilever_blue.color.slice(1) } },
			}
		}
	};
	styledTl[textKey3] = {
		s: {
			border: {
				left: { style: "thick", color: { rgb: unilever_blue.color.slice(1) } },
			}
		}
	};
	styledTl[textKey4] = {
		s: {
			border: {
				left: { style: "thick", color: { rgb: unilever_blue.color.slice(1) } },
			}
		}
	};

	console.log({styledTl});
	console.log({tl});

	const wb = { Sheets: { "topLevel": styledTl}, SheetNames: ["topLevel"] };
	const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
	// const blob = new Blob([excelBuffer], {type: fileType});

	const mailData = {
		from: `"Adviesbot ✔" <${process.env.ADVICEBOT_USER}>"`,
		to: "robbert.olierook@unilever.com",
		subject: `${category} - ${retailer} | Vrijblijvend advies`,
		text: mailText("Robbert", category, retailer),
		html: mailHtml("Robbert", category, retailer),
		attachments: [
			{
				filename: `Unilever-advies-${retailer}_${category}.xlsx`,
				content: excelBuffer,
			},
		]
	};
	transporter.sendMail(mailData, function (err, info) {

		if(err) {
			console.log({err});
			reject();
		}
		else {
			console.log({info});
			resolve();
		}
	});


});



const sendMultipleMails = async (transporter, advice) => {
	const categories = Object.keys(advice);

	for (const category of categories) {
		let combinedData = [];
		const brands = Object.keys(advice[category]);
		for (const brand of brands) {
			const concepts = Object.keys(advice[category][brand]);
			for (const concept of concepts) {
				combinedData = [...combinedData, ...advice[category][brand][concept].data];
			}
		}
		const retailerMoveUp = combinedData.reduce((acc, val) => {
			const newObject = {
				offset: "",
				EAN: val.ean,
				Productomschrijving: val.description,
				RSP: val.rsp,
				Adviesprijs: val.advice,
				Marge: val.margin,
			};
			if (Object.prototype.hasOwnProperty.call(acc, val.retailer)) {
				acc[val.retailer].push(newObject);
			} else {
				acc[val.retailer] = [newObject];
			}
			return acc;
		}, {});

		for (const retailer of Object.keys(retailerMoveUp)) {
			// try {
			await createAndSendMail(transporter, retailerMoveUp[retailer], category.toUpperCase(), retailer);
			// } catch (e) {
			// 	console.log({e});
			// }
		}
	}
};


export default function (req, res) {
	const { advice } = req.body;
	let nodemailer = require("nodemailer");

	const transporter = nodemailer.createTransport({
		port: 587,
		host: "smtp.office365.com",

		auth: {
			user: process.env.ADVICEBOT_USER,
			pass: process.env.ADVICEBOT_PASS,
		},
		secure: false,
	});

	sendMultipleMails(transporter, advice);









	return res.json({advice});


}

// subject: `Message From ${req.body.name}`,
// text: req.body.message,
// html: <div>{req.body.message}</div>
