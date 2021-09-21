
import { query } from "../../../lib/db";


const handler = async (req, res) => {
	const { category: unparsed, brand, concept } = req.query;
	if (concept && concept !== "undefined") {

		try {
			const category = unparsed ? JSON.parse(unparsed) : [];

			if (req.method === "GET") {
				const results = await query(/* sql */`
        SELECT DISTINCT ean_ce_bb FROM rsp_dashboard_basisbestand
        WHERE concept_bb = ? AND brand_ul_bb = ? AND cluster_bb IN (${category.map(() => "?").toString()})
    `, [concept, brand, ...category]
				);

				return res.json(results.map(o => o.ean_ce_bb));
			} else {
				res.status(400).json({ message: `Does not support a ${req.method} request` });
			}
		} catch (e) {

			res.status(500).json({ message: e.message});
		}
	} else {
		res.status(400).json({ message: "No info yet" });
	}
};

export default handler;
