import XLSX from "xlsx-style";
import XLSX1 from "xlsx";
import {unilever_blue} from "../../../lib/colors";


export default function (req, res) {
	let nodemailer = require("nodemailer");
	const transporter = nodemailer.createTransport({
		port: 587,
		host: "smtp.office365.com",
		auth: {
			user: "robbert_olierook@hotmail.com",
			pass: "M@#7cuH2",
		},
		secure: false,
	});


	const tl = XLSX1.utils.json_to_sheet([{test1: "value", test2: "value2"}, {test1: "value3", test2: "value4"}]);
	const styledTl = {};
	Object.entries(tl).map(([key, value]) => {
		if (key.length === 2) {
			const row = parseInt(key[1]);
			if (row === 1) {
				value = {...value, s: {
					 			fill: {
						patternType: "solid", // none / solid
						fgColor: { rgb: unilever_blue.color.slice(1) },
						// bgColor: { rgb: "FFFFFFAA" }
					},
					font: {
						sz: 16,
						color: { rgb: "FFFFFF" },
						bold: true,
						italic: false,
						underline: false
					},
					border: {
						top: { style: "thin", color: { auto: 1 } },
						right: { style: "thin", color: { auto: 1 } },
						bottom: { style: "thin", color: { auto: 1 } },
						left: { style: "thin", color: { auto: 1 } }
					}
				}
				};
			}
		}
		styledTl[key] = value;
	});
	console.log({styledTl});
	console.log({tl});

	const wb = { Sheets: { "topLevel": styledTl}, SheetNames: ["topLevel"] };
	const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
	// const blob = new Blob([excelBuffer], {type: fileType});

	const mailData = {
		from: "\"Adviesbot ✔\" <robbert_olierook@hotmail.com>",
		to: "robbert.olierook@unilever.com",
		subject: "Message From test",
		text: "test",
		html: "<div>test</div>",
		attachments: [
			{
				filename: "test.xlsx",
				content: excelBuffer,
			},
		]
	};
	transporter.sendMail(mailData, function (err, info) {
		if(err)
			console.log(err);
		else
			console.log(info);
	});
	console.log(req.body);
}

// subject: `Message From ${req.body.name}`,
// text: req.body.message,
// html: <div>{req.body.message}</div>
