
import { query } from "../../../lib/db";


const handler = async (req, res) => {
	const { category, brand, concept } = req.query;
	console.log({category, brand});
	try {

		if (req.method === "GET") {
			const results = await query(/* sql */`
        SELECT DISTINCT ean_ce_bb FROM rsp_dashboard_basisbestand
        WHERE concept_bb = ? AND brand_ul_bb = ? AND cluster_bb = ?
    `, [concept, brand, category]
			);

			return res.json(results.map(o => o.ean_ce_bb));
		} else {
			res.status(400).json({ message: `Does not support a ${req.method} request` });
		}
	} catch (e) {

		res.status(500).json({ message: e.message});
	}
};

export default handler;
