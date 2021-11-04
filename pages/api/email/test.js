import axios from "axios";
const https = require("https");


import { sendMail } from "../../../util/functions";

const instance = axios.create({
	httpsAgent: new https.Agent({
		rejectUnauthorized: false
	})
});


export default async function (req, res) {

	try {
		const token = "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";
		// const results = await instance({
		// 	url: "https://api.sendgrid.com/v3/mail/send",
		// 	method: "post",
		// 	data: {
		// 		personalizations: [
		// 			{
		// 				to: [
		// 					{
		// 						email: "robbert.olierook@unilever.com"
		// 					}
		// 				]
		// 			}
		// 		],
		// 		from: {
		// 			"email": "test@example.com"
		// 		},
		// 		subject: "Sending with SendGrid is Fun",
		// 		content: [
		// 			{
		// 				type: "text/plain",
		// 				value: "and easy to do anywhere, even with cURL"
		// 			}
		// 		]
		// 	},
		// 	headers: {
		// 		"Content-type": "application/json; charset=UTF-8",
		// 		"Authorization": "Bearer " + token,
		// 	}
		// });
		const results = await instance({
			url: "https://api.sendgrid.com/v3/mail/send",
			method: "post",
			data: {
				personalizations: [
					{
						to: [
							{
								email: "robbert.olierook@unilever.com"
							}
						]
					}
				],
				subject: "Sending with SendGrid is Fun",
				content: [
					{
						type: "text/plain",
						value: "and easy to do anywhere, even with cURL"
					}
				]
			},
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Authorization": "Bearer " + token,
			}
		});
		console.log({results});
		return res.json({results});

	} catch (e) {
		console.error({e});
	}




}

// subject: `Message From ${req.body.name}`,
// text: req.body.message,
// html: <div>{req.body.message}</div>
