
import {
	getBrands,
	getCategoryInfo,
} from "../../../util/api-functions/queries";
import { saveParse } from "../../../util/functions";




const handler = async (req, res) => {
	const { category: unparsed, cat } = req.query;
	if (unparsed && unparsed !== "undefined") {
		try {
			const category = saveParse(unparsed);
			if (req.method === "GET") {
				const categoryInfo = await getCategoryInfo(cat);
				const brands = await getBrands(category, categoryInfo);
				return res.json(brands);
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
