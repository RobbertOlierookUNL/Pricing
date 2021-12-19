




import { upsertAdvicePrices } from "../../../../util/api-functions/queries";


const handler = async (req, res) => {
	const {ean, adviceH, adviceL} = req.body;
	try {
		const results = await upsertAdvicePrices(ean, adviceH, adviceL);
		return res.json(results);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

export default handler;
