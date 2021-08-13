
import { query } from "../../../lib/db";


const handler = async (req, res) => {
	const { category: unparsed, brand } = req.query;
	if (brand && brand !== "undefined") {

		try {
			const category = unparsed ? JSON.parse(unparsed) : [];

			if (req.method === "GET") {
				const results = await query(/* sql */`
        SELECT DISTINCT concept_bb FROM rsp_dashboard_basisbestand
        WHERE brand_ul_bb = ? AND cluster_bb IN (${category.map(() => "?").toString()})
    `, [brand, ...category]
				);

				return res.json(results.map(o => o.concept_bb));
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
