
import { query } from "../../../lib/db";
import { saveParse } from "../../../util/functions";



const handler = async (req, res) => {
	const { category: unparsed, brand } = req.query;
	if (brand && brand !== "undefined") {

		try {
			const category = saveParse(unparsed);

			if (req.method === "GET") {
				const results = await query(/* sql */`
					SELECT DISTINCT ProductBrandFormName
					FROM athena_rsp_product
					WHERE ProductBrandName = ?
					AND ProductSubdivision2Desc IN (${category.map(() => "?").toString()})
					AND ProductCode IN (
						SELECT DISTINCT ESRA_Product
						FROM athena_rsp_volume
						WHERE 1M_Volume > 0
					)
					AND ProductCode IN (
						SELECT DISTINCT Mrdr FROM athena_rsp_price
						WHERE Price > 0
					)
					ORDER BY ProductBrandFormName

    `, [brand, ...category]
				);
				return res.json(results.map(o => o.ProductBrandFormName));
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
