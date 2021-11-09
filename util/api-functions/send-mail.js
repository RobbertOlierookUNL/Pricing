import { mailHtml, mailText } from "../../lib/text";

const sendMail = (excelBuffer, transporter, info, retailer, category) => new Promise(function(resolve, reject){
	console.log({info, retailer});
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

export default sendMail;
