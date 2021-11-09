import sendMultipleMails from "../../../util/api-functions/send-multiple-mails";

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
