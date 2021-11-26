
import axios from "axios";
const https = require("https");


const instance = axios.create({
	httpsAgent: new https.Agent({
		rejectUnauthorized: false
	})
});

export default async function (req, res) {

	try {
		// const sgMail = require("@sendgrid/mail");
		// console.log({key: process.env.SG_API_KEY});
		// sgMail.setApiKey(process.env.SG_API_KEY);
		// const msg = {
		// 	to: "robbert.olierok@unilever.com", // Change to your recipient
		// 	from: "robbert.olierook@unilever.com", // Change to your verified sender
		// 	subject: "Sending with SendGrid is Fun",
		// 	text: "and easy to do anywhere, even with Node.js",
		// 	html: "<strong>and easy to do anywhere, even with Node.js</strong>",
		// };
		// const r = await sgMail.send(msg);
		// console.log("email sent");
		// return res.json({r});
		const token = process.env.SG_API_KEY;
		await instance({
			url: "https://api.sendgrid.com/v3/mail/send",
			method: "post",
			data: {
				personalizations: [
					{
						to: [
							{
								email: "Coen.Molenaar@unilever.com",
							}
						]
					}
				],
				from: {
					email: "Robbert.Olierook@unilever.com",
				},
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
		console.log("is sent");
		return res.json({done: true});

	} catch (e) {
		console.error({e});
	}




}
