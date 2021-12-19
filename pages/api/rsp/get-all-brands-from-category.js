
import {
	getBrands,
	getCategoryInfo,
	getCompetitorBrands,
	getValidEans
} from "../../../util/api-functions/queries";
import { saveParse } from "../../../util/functions";






const handler = async (req, res) => {
	const { category: unparsed, cat } = req.query;
	if (unparsed && unparsed !== "undefined") {
		try {
			const category = saveParse(unparsed);
			if (req.method === "GET") {
				if (category[0] !== "umfeld") {
					const categoryInfo = await getCategoryInfo(cat);
					console.time("getBrands validEans " + cat);
					const validEans = await getValidEans();
					console.timeEnd("getBrands validEans " + cat);
					console.time("getBrands brands " + cat);
					const brands = await getBrands(category, categoryInfo, validEans);
					console.time("getBrands brands " + cat);
					return res.json(brands);
				} else {
					const brands = await getCompetitorBrands();
					return res.json(brands);

				}

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
