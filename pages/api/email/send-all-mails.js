import XLSX from "xlsx-style";
import XLSX1 from "xlsx";

import { calculateMargin } from "../../../util/functions";
import { excelText, mailHtml, mailText } from "../../../lib/text";
import { query } from "../../../lib/db";
import {unilever_blue} from "../../../lib/colors";



const getHasNasa = async () => {
	const nasaRetailers = await query(/* sql */`
		SELECT retailer FROM pricing_tool_retailers
		WHERE nasa = ?
`, 1
	);
	const hasNasa = (ret) => {
		for (const nasaRet of nasaRetailers) {
			if (nasaRet.retailer === ret) {
				return true;
			}
		}
		return false;
	};
	return hasNasa;
};


const createAndSendMail = (transporter, arrayOfObjects, category, retailer, info, hasNasaColumn) => new Promise(function(resolve, reject) {
	const totalMargin = arrayOfObjects.reduce((acc, val) => {
		acc += val.Marge || 0;
		return acc;
	}, 0);
	const hasMargin = !!totalMargin;
	const nasaCorrection = hasNasaColumn ? 1 : 0;
	const eanColumn = 1;
	const nasaColumn = hasNasaColumn && 2;
	const descriptionColumn = 2 + nasaCorrection;
	const rspColumn = 3 + nasaCorrection;
	const adviceColumn = 4 + nasaCorrection;
	const marginColumn = 5 + nasaCorrection;

	const endColumn = (hasMargin ? 5 : 4) + nasaCorrection;
	const mainCharacters = (hasMargin || hasNasaColumn) ? 14 : 17;
	const descriptionCharacters = (hasMargin || hasNasaColumn) ? 51 : 55;
	const newArrayOfObjects = hasNasaColumn ?
	 [
			{
				offset: "",
				EAN: "EAN",
				NASA: "NASA",
				Productomschrijving: "Productomschrijving",
				RSP: "RSP",
				Adviesprijs: "Adviesprijs",
				Marge: "Marge",
			},
			...arrayOfObjects
		]
		:
		[
			 {
				 offset: "",
				 EAN: "EAN",
				 Productomschrijving: "Productomschrijving",
				 RSP: "RSP",
				 Adviesprijs: "Adviesprijs",
				 Marge: "Marge",
			 },
			 ...arrayOfObjects
		]
	;
	const tl = XLSX1.utils.json_to_sheet(newArrayOfObjects);
	const range = XLSX.utils.decode_range(tl["!ref"]);
	range.s.r = 1;
	range.s.c = 1;
	range.e.c = endColumn;
	const endRow = {...range.e}.r;
	range.e.r += 7;
	const textRow = range.e.r;
	console.log({range});
	tl["!ref"] = XLSX.utils.encode_range(range);
	tl["!cols"] = hasNasaColumn ?
		[{wch: 2}, {wch: mainCharacters}, {wch: mainCharacters}, {wch: descriptionCharacters}, {wch: mainCharacters}, {wch: mainCharacters}, {wch: mainCharacters}]
		:
		[{wch: 2}, {wch: mainCharacters}, {wch: descriptionCharacters}, {wch: mainCharacters}, {wch: mainCharacters}, {wch: mainCharacters}];

	tl["!merges"] = [{s: {c: 1, r: textRow - 3}, e: {c: endColumn, r: textRow}}];

	const styledTl = {};
	Object.entries(tl).map(([key, value]) => {
		const cell = XLSX.utils.decode_cell(key);
		const col = cell.c;
		const row = cell.r;
		if (col === eanColumn) {
			value = {...value, s: {
				border: {
					left: { style: "thin", color: { auto: 1 } },
				}
			}
			};
		}
		if (col === rspColumn || col === adviceColumn ) {
			value = {...value, z: "€0.00"};
		}
		if (col === marginColumn) {
			value = {...value,
				z: "€#,##0"
			};
		}
		if (col === endColumn) {
			value = {...value, s: {
				border: {
					right: { style: "thin", color: { auto: 1 } },
				}
			},
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
			},
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

	console.log({tl});

	const wb = { Sheets: { "Vrijblijvend Advies": styledTl}, SheetNames: ["Vrijblijvend Advies"] };
	const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
	// const blob = new Blob([excelBuffer], {type: fileType});

	const mailData = {
		from: `"Adviesbot ✔" <${process.env.ADVICEBOT_USER}>"`,
		to: info?.[retailer]?.email || "robbert.olierook@unilever.com",
		subject: `${category} - ${retailer} | Vrijblijvend advies`,
		text: mailText(info?.[retailer]?.name || "", category, retailer),
		html: mailHtml(info?.[retailer]?.name || "", category, retailer),
		attachments: [
			{
				filename: `Unilever - Vrijblijvend advies ${info?.week ? `W${info.week} ` : ""}- ${retailer} - ${info?.title || category}.xlsx`,
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



const sendMultipleMails = async (transporter, advice, info) => {
	const categories = Object.keys(advice);
	const hasNasa = await getHasNasa();

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

			const newObject = hasNasa(val.retailer) ?
				{
					offset: "",
					EAN: val.ean,
					NASA: val.nasa,
					Productomschrijving: val.description,
					RSP: val.rsp,
					Adviesprijs: val.advice,
					Marge: calculateMargin(val.advice, val.rsp, val.volume),
				}
				:
				{
					offset: "",
					EAN: val.ean,
					Productomschrijving: val.description,
					RSP: val.rsp,
					Adviesprijs: val.advice,
					Marge: calculateMargin(val.advice, val.rsp, val.volume),
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
			await createAndSendMail(transporter, retailerMoveUp[retailer], category.toUpperCase(), retailer, info[category], hasNasa(retailer));
			// } catch (e) {
			// 	console.log({e});
			// }
		}
	}
};


export default function (req, res) {
	const { advice, info } = req.body;
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

	sendMultipleMails(transporter, advice, info);









	return res.json({advice});


}

// subject: `Message From ${req.body.name}`,
// text: req.body.message,
// html: <div>{req.body.message}</div>
