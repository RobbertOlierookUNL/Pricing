import { deletePerson } from "../../../../util/api-functions/queries";


const handler = async (req, res) => {
	const {id} = req.body;
	try {
		const results = await deletePerson(id);
		return res.json(results);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

export default handler;
