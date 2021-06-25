
import { query } from "../../../lib/db";


const handler = async (req, res) => {
	const { eans: unparsed } = req.query;

	try {
		const eans = unparsed ? JSON.parse(unparsed) : [];

		if (req.method === "GET") {
			const results = await query(/* sql */`
        SELECT * FROM rsp_dashboard_rsp
        WHERE EAN_CE IN (${eans.map(() => "?").toString()})
    `, eans
			);
			const mapping = await query(/* sql */`
					SELECT * FROM rsp_dashboard_mapping_customer
			`,
			);
			const volume = await query(/* sql */`
					SELECT * FROM rsp_dashboard_esra
					WHERE EAN_code IN (${eans.map(() => "?").toString()})
			`, eans
			);
			const myMap = mapping.reduce((acc, val) => {
				acc[val.Rsp_Customer] = val.Esra_Customers;
				return acc;
			}, {});
			const nonEmptyResults = [];
			for (const product of results) {
				let push = false;
				const prices = {};
				const {Artikelomschrijving, EAN_CE, CAP_H, CAP_L, ...others} = product;
				for (const [retailer, price] of Object.entries(others)) {
					if (price & !push) {
						push = true;
					}

					const myVolume = volume.find(e => e.EAN_code === EAN_CE && e.Klant === myMap[retailer]);
					prices[retailer] = {rsp: price, volume: myVolume?.CU_MAT_CY || 0};
				}
				if (push) {
					const tempObj = {Artikelomschrijving, EAN_CE, CAP_H, CAP_L, prices};
					nonEmptyResults.push(tempObj);
				}
			}
			return res.json(nonEmptyResults);
		} else {
			res.status(400).json({ message: `Does not support a ${req.method} request` });
		}
	} catch (e) {

		res.status(500).json({ message: e.message});
	}
};

export default handler;
