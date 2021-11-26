
import {
	getCategoryInfo,
	getConcepts
} from "../../../util/api-functions/queries";
import { saveParse } from "../../../util/functions";




const handler = async (req, res) => {
	const { category: unparsed, brand, cat } = req.query;
	if (brand && brand !== "undefined") {

		try {
			const category = saveParse(unparsed);

			if (req.method === "GET") {
				const categoryInfo = await getCategoryInfo(cat);
				const concepts = await getConcepts(category, brand, categoryInfo);
				return res.json(concepts);
			} else {
				res.status(400).json({ message: `Does not support a ${req.method} request` });
			}
		} catch (e) {

			res.status(500).json({ message: e.message});
		}
	} else {
		res.status(200).json({ message: "No info yet" });
	}
};

export default handler;
