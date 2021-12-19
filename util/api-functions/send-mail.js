import { mailHtml, mailText } from "../../lib/text";




const sendMail = async (excelBuffer, transporter, info, retailer, category) => {
	try {
		const token = process.env.SG_API_KEY;
		await transporter({
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
					name: "bot, advies",
					email: process.env.ADVICEBOT_USER,
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
						"content": excelBuffer.toString("base64"),
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
		console.log(`sent ${category} - ${retailer} to ${info?.[retailer]?.email || "robbert.olierook@unilever.com"}`);
	} catch (e) {
		console.log(e);
	}

};

export default sendMail;
