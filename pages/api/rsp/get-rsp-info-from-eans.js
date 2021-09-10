
import { query } from "../../../lib/db";
import {distanceMaker, makeRetailSalesPrice, getTodayString} from "util/functions";



const handler = async (req, res) => {
	const { eans: unparsed } = req.query;
	const todayString = getTodayString();
	if (unparsed && unparsed !== "undefined") {

		try {
			const eans = unparsed ? JSON.parse(unparsed) : [];

			if (req.method === "GET") {
				const retailers = await query(/* sql */`
					SELECT * FROM pricing_tool_retailers
			`,);

				const rspRetailers = retailers.map(ret => ret.retailer);
				const showRetailer = rspRetailers.map(ret => ({retailer: ret, found: false}));
				const retailerInfo = retailers.reduce((acc, val) => {
					const {retailer: thisRetailer, ...info} = val;
					acc[thisRetailer] = info;
					return acc;
				}, {});

				const results = await query(/* sql */`
        SELECT Artikelomschrijving, Account, Delta, ${todayString}, EAN, Referentie_EAN, CAP_Hoog, CAP_Laag FROM rsp_dashboard_rsp_tijd
        WHERE EAN IN (${eans.map(() => "?").toString()})
    `, eans
				);
				const mapping = await query(/* sql */`
					SELECT * FROM rsp_dashboard_mapping_customer
					WHERE Rsp_Tijd IN (${rspRetailers.map(() => "?").toString()})
			`, rspRetailers
				);
				const volume = await query(/* sql */`
					SELECT * FROM rsp_dashboard_esra2
					WHERE EAN_code IN (${eans.map(() => "?").toString()})
			`, eans
				);


				const myMap = mapping.reduce((acc, val) => {
					acc[val.Rsp_Tijd] = val.Esra_Customers;
					return acc;
				}, {});

				const reducedResults = results.reduce((acc, val) => {
					const {Delta: delta, Account: account, [todayString]: rsp, EAN: EAN_CE, CAP_Hoog: CAP_H, CAP_Laag: CAP_L, Referentie_EAN, ...others} = val;
					const index = showRetailer.findIndex(el => el.retailer === account);
					if (showRetailer[index]?.found === false) {
						showRetailer[index].found = true;
					}
					if (acc.some(e => e.EAN_CE === EAN_CE)) {
						const entry = acc.find(e => e.EAN_CE === EAN_CE);
						entry[account] = {delta, rsp};
					} else {
						const info = {EAN_CE, CAP_H, CAP_L, Referentie_EAN, ...others};
						acc.push({...info, [account]: {delta, rsp}});
					}
					return acc;
				}, []);
				const nonEmptyResults = [];


				for (const entry of reducedResults) {
					let push = false;
					let totalVolume = 0;
					const prices = [];
					const poolCapH = [];
					const poolCapL = [];
					const {Artikelomschrijving, EAN_CE, Referentie_EAN, CAP_H, CAP_L, ...others} = entry;
					const thisRetailers = JSON.parse(JSON.stringify(showRetailer));
					const addVolumePushPrice = (retailer, price, delta) => {

						const myVolume = volume.find(e => e.EAN_code === (Referentie_EAN || EAN_CE) && e.Klant === myMap[retailer])?.CU_MAT_CY || 0;
						totalVolume += myVolume;
						prices.push({retailer, rsp: price, delta, volume: myVolume, ...retailerInfo[retailer]});
					};
					for (const [retailer, {rsp: price, delta}] of Object.entries(others)) {
						if (price && !push) {
							push = true;
						}
						const index = thisRetailers.findIndex(el => el.retailer === retailer);
						if (thisRetailers[index]?.found === true) {
							thisRetailers[index].found = "pushed";
						}

						const cap = retailerInfo[retailer]?.cap;
						if (cap === "H") {
							poolCapH.push(price);
						}
						if (cap === "L") {
							poolCapL.push(price);
						}
						addVolumePushPrice(retailer, price, delta);
					}
					const unpushedRetailers = thisRetailers.reduce((acc, val) => {
						if (val.found === true) {
							acc.push(val.retailer);
						}
						return acc;
					}, []);
					for (const ret of unpushedRetailers) {
						addVolumePushPrice(ret, 0, 0);
					}

					const maxLowValue = Math.max(...poolCapL);
					poolCapH.push(distanceMaker(maxLowValue, true));
					const defaultAdviceHigh = Math.min(makeRetailSalesPrice(Math.max(...poolCapH)), CAP_H);
					const defaultAdviceLow = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh));
					const approxWorth = totalVolume * defaultAdviceLow;

					if (push) {
						const tempObj = {Artikelomschrijving, totalVolume, approxWorth, defaultAdviceLow, defaultAdviceHigh, EAN_CE, CAP_H, CAP_L, prices};
						nonEmptyResults.push(tempObj);
					}
				}
				// showRetailer.forEach((ret) => {
				// 	if (!ret.show) {
				// 		nonEmptyResults.find(e => e.)
				// 	}
				// });
				const foundRetailers = retailers.filter(ret => showRetailer.find(r => r.retailer === ret.retailer)?.found);
				return res.json({headers: foundRetailers, body: nonEmptyResults.sort((a,b) => b.approxWorth - a.approxWorth)});
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
