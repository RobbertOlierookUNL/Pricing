import { getPeople } from "../../../../util/api-functions/queries";



const handler = async (req, res) => {
	try {
		const results = await getPeople();
		return res.json(results);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

export default handler;
