
import { query } from "../../../lib/db";


const handler = async (req, res) => {
	const { category } = req.query;
	console.log(category);
	if (category && category !== "undefined") {

		try {

			if (req.method === "GET") {
				const results = await query(/* sql */`
        SELECT dashboard_category FROM pricing_tool_mapping_category
        WHERE tool_category = ?
    `, category
				);
				const myResults = results.map(o => o.dashboard_category);
				// return res.json(results.map(o => o.dashboard_category));
				return res.json(myResults);

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
