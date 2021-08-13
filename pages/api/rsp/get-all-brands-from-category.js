
import { query } from "../../../lib/db";


const handler = async (req, res) => {
	const { category: unparsed } = req.query;
	console.log({unparsed});
	if (unparsed && unparsed !== "undefined") {
		try {
			const category = unparsed ? JSON.parse(unparsed) : [];

			if (req.method === "GET") {
				const results = await query(/* sql */`
        SELECT DISTINCT brand_ul_bb FROM rsp_dashboard_basisbestand
        WHERE cluster_bb IN  (${category.map(() => "?").toString()})
    `, category
				);

				return res.json(results.map(o => o.brand_ul_bb));
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
