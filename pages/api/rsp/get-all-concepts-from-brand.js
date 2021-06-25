
import { query } from "../../../lib/db";


const handler = async (req, res) => {
	const { category, brand } = req.query;
	console.log({category, brand});
	try {

		if (req.method === "GET") {
			const results = await query(/* sql */`
        SELECT DISTINCT concept_bb FROM rsp_dashboard_basisbestand
        WHERE brand_ul_bb = ? AND cluster_bb = ?
    `, [brand, category]
			);

			return res.json(results.map(o => o.concept_bb));
		} else {
			res.status(400).json({ message: `Does not support a ${req.method} request` });
		}
	} catch (e) {

		res.status(500).json({ message: e.message});
	}
};

export default handler;
