import { insertPerson } from "../../../../util/api-functions/queries";



const handler = async (req, res) => {
	const {email, first_name, last_name} = req.body;
	try {
		const results = await insertPerson(email, first_name, last_name);
		return res.json(results);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

export default handler;
