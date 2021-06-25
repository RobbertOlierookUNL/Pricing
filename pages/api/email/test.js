import XLSX from "xlsx";

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


	const tl = XLSX.utils.json_to_sheet([{test1: "value", test2: "value2"}, {test1: "value3", test2: "value4"}]);

	const wb = { Sheets: { "topLevel": tl}, SheetNames: ["topLevel"] };
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
