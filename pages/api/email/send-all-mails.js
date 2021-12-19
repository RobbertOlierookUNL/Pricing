import axios from "axios";

import iterateAdvices from "../../../util/api-functions/iterate-advices";


export default async function (req, res) {
	const { advice, info } = req.body;
	// let nodemailer = require("nodemailer");
	//
	// const transporter = nodemailer.createTransport({
	// 	port: 587,
	// 	host: "smtp.office365.com",
	//
	// 	auth: {
	// 		user: process.env.ADVICEBOT_USER,
	// 		pass: process.env.ADVICEBOT_PASS,
	// 	},
	// 	secure: false,
	// });

	const https = require("https");

	const transporter = axios.create({
		httpsAgent: new https.Agent({
			rejectUnauthorized: false,
		}),
	});

	iterateAdvices(transporter, advice, info);

	return res.json({done: true});


}
