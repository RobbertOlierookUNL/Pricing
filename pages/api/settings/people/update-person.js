import { updatePerson } from "../../../../util/api-functions/queries";




const handler = async (req, res) => {
	const {id, email, first_name, last_name} = req.body;
	try {
		const results = await updatePerson(id, email, first_name, last_name);
		return res.json(results);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

export default handler;
