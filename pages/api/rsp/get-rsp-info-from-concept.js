
import { allBrandsText, allConceptsFromBrandText } from "../../../lib/config";
import { getAdvicePrices, getDateStrings } from "../../../util/functions";
import { query } from "../../../lib/db";



const handler = async (req, res) => {
	const { category: unparsed, brand, concept } = req.query;
	const {todayString, yesterdayString, lastWeekString, lastMonthString, firstDayString} = getDateStrings();
	const allMode = brand === allBrandsText;
	const allFromBrandMode = concept === allConceptsFromBrandText(brand);
	if (concept && concept !== "undefined") {

		try {
			const category = unparsed ? JSON.parse(unparsed) : [];

			if (req.method === "GET") {
				let results;
				if (allMode) {
					results = await query(/* sql */`
					SELECT DISTINCT ean_ce_bb, artikel_code_ah_nasa_bb FROM rsp_dashboard_basisbestand
					WHERE cluster_bb IN (${category.map(() => "?").toString()})
			`, [...category]);
				} else if (allFromBrandMode){
					results = await query(/* sql */`
					SELECT DISTINCT ean_ce_bb, artikel_code_ah_nasa_bb FROM rsp_dashboard_basisbestand
					WHERE brand_ul_bb = ? AND cluster_bb IN (${category.map(() => "?").toString()})
			`, [brand, ...category]);
				} else {
					results = await query(/* sql */`
					SELECT DISTINCT ean_ce_bb, artikel_code_ah_nasa_bb FROM rsp_dashboard_basisbestand
					WHERE concept_bb = ? AND brand_ul_bb = ? AND cluster_bb IN (${category.map(() => "?").toString()})
			`, [concept, brand, ...category]
					);
				}
			 const eans = results.map(o => o.ean_ce_bb);
			 const nasaMap = {};
			 for (const o of results) {
				 nasaMap[o.ean_ce_bb] = o.artikel_code_ah_nasa_bb;
			 }

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

				const rspInfo = await query(/* sql */`
        SELECT Artikelomschrijving, Account, Delta, ${todayString}, ${yesterdayString}, ${lastWeekString}, ${lastMonthString}, ${firstDayString}, EAN, Referentie_EAN, CAP_Hoog, CAP_Laag FROM rsp_dashboard_rsp_tijd
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

				const reducedResults = rspInfo.reduce((acc, val) => {
					const {Delta: delta, Account: account, [todayString]: rsp, [yesterdayString]: dayRsp, [lastWeekString]: weekRsp, [lastMonthString]: monthRsp, [firstDayString]: ytdRsp, EAN: EAN_CE, CAP_Hoog: CAP_H, CAP_Laag: CAP_L, Referentie_EAN, ...others} = val;

					const index = showRetailer.findIndex(el => el.retailer === account);
					if (showRetailer[index]?.found === false) {
						showRetailer[index].found = true;
					}
					if (acc.some(e => e.EAN_CE === EAN_CE)) {
						const entry = acc.find(e => e.EAN_CE === EAN_CE);
						entry[account] = {rsp, dayRsp, weekRsp, monthRsp, ytdRsp};
					} else {
						const info = {EAN_CE, CAP_H, CAP_L, Referentie_EAN, ...others};
						acc.push({...info, [account]: {rsp, dayRsp, weekRsp, monthRsp, ytdRsp}});
					}
					return acc;
				}, []);
				const nonEmptyResults = [];


				for (const entry of reducedResults) {
					console.log(`${nonEmptyResults.length} / ${reducedResults.length}`);
					let push = false;
					let totalVolume = 0;
					const prices = [];
					let priceSetterPrice = 0;
					const poolCapH = [];
					const poolCapL = [];
					const {Artikelomschrijving, EAN_CE, Referentie_EAN, CAP_H, CAP_L, ...others} = entry;
					// const NASA = await getNasa(EAN_CE);
					// const NASA = 0;
					const NASA = nasaMap[EAN_CE];
					const thisRetailers = JSON.parse(JSON.stringify(showRetailer));
					const addVolumePushPrice = (retailer, measurementInfo) => {

						const myVolume = volume.find(e => e.EAN_code === (Referentie_EAN || EAN_CE) && e.Klant === myMap[retailer])?.CU_MAT_CY || 0;
						totalVolume += myVolume;
						prices.push({retailer, ...measurementInfo, volume: myVolume, CAP_H, ...retailerInfo[retailer]});
					};
					for (const [retailer, {rsp: price, dayRsp, weekRsp, monthRsp, ytdRsp}] of Object.entries(others)) {
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
						// TODO: Make dynamic
						if (retailer === "AH") {
							priceSetterPrice = price;
						}

						addVolumePushPrice(retailer, {rsp: price, dayRsp, weekRsp, monthRsp, ytdRsp});
					}
					const unpushedRetailers = thisRetailers.reduce((acc, val) => {
						if (val.found === true) {
							acc.push(val.retailer);
						}
						return acc;
					}, []);
					for (const ret of unpushedRetailers) {
						addVolumePushPrice(ret, {price: 0, dayRsp: 0, weekRsp: 0, monthRsp: 0, ytdRsp: 0});
					}

					const [defaultAdviceHigh, defaultAdviceLow] = getAdvicePrices(poolCapH, poolCapL, CAP_H, CAP_L, priceSetterPrice);

					// const maxLowValue = Math.max(...poolCapL);
					// poolCapH.push(distanceMaker(maxLowValue, true));
					// const defaultAdviceHigh = Math.min(makeRetailSalesPrice(Math.max(...poolCapH)), CAP_H);
					// const defaultAdviceLow = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh));
					const approxWorth = totalVolume * defaultAdviceLow.opportune;

					if (push) {
						const tempObj = {Artikelomschrijving, totalVolume, approxWorth, defaultAdviceLow, defaultAdviceHigh, EAN_CE, CAP_H, CAP_L, NASA, prices};
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
