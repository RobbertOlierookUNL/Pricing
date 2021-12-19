
import {
	getCategoryInfo,
	getCompetitorConcepts,
	getConceptNicknames,
	getConcepts,
	getValidEans
} from "../../../util/api-functions/queries";
import { getNicknamesMap } from "../../../util/api-functions/query-helpers";
import { saveParse } from "../../../util/functions";








const handler = async (req, res) => {
	const { category: unparsed, brand, cat } = req.query;
	if (brand && brand !== "undefined") {

		try {
			const category = saveParse(unparsed);

			if (req.method === "GET") {
				if (category[0] !== "umfeld") {
					const categoryInfo = await getCategoryInfo(cat);
					const validEans = await getValidEans();
					const concepts = await getConcepts(category, brand, categoryInfo, validEans);
					const conceptNicknames = await getConceptNicknames(cat, brand);
					const nicknamesMap = getNicknamesMap(concepts, conceptNicknames);
					console.log({nicknamesMap});
					return res.json(nicknamesMap);
				} else {
					const concepts = await getCompetitorConcepts(brand);
					const mappie = {};
					for (const concept of concepts) {
						Array.isArray(mappie[concept]) ? mappie[concept].push(concept) : mappie[concept] = [concept];
					}
					console.log({mappie});
					return res.json(mappie);
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
