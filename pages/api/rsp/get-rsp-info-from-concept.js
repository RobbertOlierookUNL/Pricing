import { allBrandsText, allConceptsFromBrandText } from "../../../lib/config";
import {
	distanceMaker,
	makeRetailSalesPrice,
	saveParse
} from "../../../util/functions";
import {
	getAllProducts,
	getAllProductsFromBrand,
	getMeasurements,
	getProducts,
	getRetailers,
	getVolumes
} from "../../../util/api-functions/queries";
import {
	getCodes,
	getHeaders,
	getRetailerMap,
	getRetailersAndMeasurementsPerEan,
	getVolumeMap,
	fillData
} from "../../../util/api-functions/query-helpers";
import getAdvicePrices from "../../../util/api-functions/get-advice-prices";
import getDateStrings from "../../../util/api-functions/get-date-strings";



const handler = async (req, res) => {
	const { category: unparsed, brand, concept, cat } = req.query;
	const dateStrings = getDateStrings();
	const allMode = brand === allBrandsText;
	const allFromBrandMode = concept === allConceptsFromBrandText(brand);
	if (concept && concept !== "undefined") {

		try {
			const category = saveParse(unparsed);

			if (req.method === "GET") {
				let products;
				if (allMode) {
					products = await getAllProducts(category);
				} else if (allFromBrandMode) {
					products = await getAllProductsFromBrand(category, brand);
				} else {
					products = await getProducts(category, brand, concept);
				}
				console.log(`${brand} - ${concept} - #products: ${products.length} - 0%`);
				const {eanToMrdr, eans, mrdrs} = getCodes(products);
				const measurements = await getMeasurements(eans, dateStrings);
				console.log(`${brand} - ${concept} - #measurements: ${measurements.length} - 25%`);
				const volumes = await getVolumes(mrdrs);
				const mrdrToVolumeInfo = getVolumeMap(volumes);
				console.log(`${brand} - ${concept} - #volumes found: ${volumes.length} - 50%`);
				const retailers = await getRetailers(cat);
				const retailerToInfo = getRetailerMap(retailers);
				const {actualRetailers, measurementsByEan} = getRetailersAndMeasurementsPerEan(measurements, retailerToInfo, mrdrToVolumeInfo, eanToMrdr, dateStrings);
				const headers = getHeaders(actualRetailers, retailerToInfo);
				console.log(`${brand} - ${concept} - #retailers found: ${actualRetailers.size} - 75%`);
				const unSortedBody = [];
				const usedEans = [];
				const doubleEans = [];

				for (const p of products) {
					const processedEans = usedEans.length + doubleEans.length;
					if (processedEans === (products.length -1)) {
						console.log(`${brand} - ${concept} - #measurements by EAN: ${Object.keys(measurementsByEan).length} - 100%`);
					}
					const ean = parseInt(p.ZcuEanCode);
					if (!usedEans.some(e => e === ean)) {
						usedEans.push(ean);
						const theseMeasurements = measurementsByEan[ean];
						const hasMeasurements = !!theseMeasurements;
						if (hasMeasurements) {
							const {info: {cap, nasa, approxWorth, totalVolume, poolCapH, poolCapL, priceSetterPrice}, data} = theseMeasurements;
							const prices = fillData(data, eanToMrdr[ean], actualRetailers, retailerToInfo, mrdrToVolumeInfo);
							const [defaultAdviceHigh, defaultAdviceLow] = getAdvicePrices(poolCapH, poolCapL, cap, priceSetterPrice);
							unSortedBody.push({
								Artikelomschrijving: p.ProductEnglishName,
								CAP_H: makeRetailSalesPrice(cap || 0),
								CAP_L: makeRetailSalesPrice(distanceMaker(cap || 0)),
								EAN_CE: ean,
								NASA: nasa || "",
								approxWorth: approxWorth || 0,
								totalVolume: totalVolume || 0,
								prices,
								defaultAdviceLow,
								defaultAdviceHigh,
							});
						}
					} else {
						doubleEans.push(ean);
					}
				}
				const body = unSortedBody.sort((a,b) => b.approxWorth - a.approxWorth);
				console.log(`${brand} - ${concept} - #non empty products${body.length}`);

				// console.log({headers, body});





				return res.json({headers, body});
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
