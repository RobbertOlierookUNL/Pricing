
import { getCategories } from "../../../util/api-functions/queries";
import { query } from "../../../lib/db";



const handler = async (req, res) => {
	const { category } = req.query;
	if (category && category !== "undefined") {

		try {

			if (req.method === "GET") {
				if (category !== "umfeld") {
					const results = await getCategories(category);
					return res.json(results);
				} else return res.json([category]);

			} else {
				res.status(400).json({ message: `Does not support a ${req.method} request` });
			}
		} catch (e) {

			res.status(500).json({ message: e.message});
		}
	} else {
		res.status(204).json("no info yet");
	}
};

export default handler;
