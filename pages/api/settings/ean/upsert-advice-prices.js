




import { upsertAdvicePrices } from "../../../../util/api-functions/queries";


const handler = async (req, res) => {
	const {EAN, adviceH, adviceL} = req.body;
	try {
		const results = await upsertAdvicePrices(EAN, adviceH, adviceL);
		return res.json(results);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

export default handler;
