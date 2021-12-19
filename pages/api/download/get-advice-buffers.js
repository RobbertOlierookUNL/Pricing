import iterateAdvices from "../../../util/api-functions/iterate-advices";



export default async function (req, res) {
	const { advice, info } = req.body;

	const transporter = false;

	const buffers = await iterateAdvices(transporter, advice, info);

	return res.json(buffers);


}
