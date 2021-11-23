import { mailHtml, mailText } from "../../lib/text";

import axios from "axios";
const https = require("https");


const instance = axios.create({
	httpsAgent: new https.Agent({
		rejectUnauthorized: false
	})
});


const sendMail = (excelBuffer, transporter, info, retailer, category) => new Promise(function(resolve, reject){

	const token = process.env.SG_API_KEY;
	instance({
		url: "https://api.sendgrid.com/v3/mail/send",
		method: "post",
		data: {
			personalizations: [
				{
					to: [
						{
							email: info?.[retailer]?.email || "robbert.olierook@unilever.com",
						}
					]
				}
			],
			from: {
				name: "Adviesbot ✔",
				email: "Robbert.Olierook@unilever.com",
			},
			subject: `${category} - ${retailer} | Vrijblijvend advies`,
			content: [
				{
					type: "text/plain",
					value: mailText(info?.[retailer]?.name || "", category, retailer)
				},
				{
					type: "text/html",
					value: mailHtml(info?.[retailer]?.name || "", category, retailer)
				}
			],
			"attachments": [
				{
					"content": excelBuffer,
					"filename": `Unilever - Vrijblijvend advies ${info?.week ? `W${info.week} ` : ""}- ${retailer} - ${info?.title || category}.xlsx`,
					"disposition": "attachment"
				}
			],
		},
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			"Authorization": "Bearer " + token,
		}
	});

// 	const mailData = {
// 		from: `"Adviesbot ✔" <${process.env.ADVICEBOT_USER}>"`,
// 		to: info?.[retailer]?.email || "robbert.olierook@unilever.com",
// 		subject: `${category} - ${retailer} | Vrijblijvend advies`,
// 		text: mailText(info?.[retailer]?.name || "", category, retailer),
// 		html: mailHtml(info?.[retailer]?.name || "", category, retailer),
// 		attachments: [
// 			{
// 				filename: `Unilever - Vrijblijvend advies ${info?.week ? `W${info.week} ` : ""}- ${retailer} - ${info?.title || category}.xlsx`,
// 				content: excelBuffer,
// 			},
// 		]
// 	};
// 	transporter.sendMail(mailData, function (err, info) {
//
// 		if(err) {
// 			console.log({err});
// 			reject();
// 		}
// 		else {
// 			console.log({info});
// 			resolve();
// 		}
// 	});
// });
});

export default sendMail;
