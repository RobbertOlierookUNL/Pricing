import { allBrandsText, allConceptsFromBrandText } from "../../../lib/config";
import {
	getAllCompetitorProductsFromBrand,
	getCategoryInfo,
	getCompetitorInfo,
	getCompetitorMeasurements,
	getCompetitorProducts,
	getRetailers
} from "../../../util/api-functions/queries";
import {
	getCompetitorBody,
	getCompetitorCodes,
	getHeaders,
	getRetailerMap,
	getRetailersAndCompetitorMeasurementsPerId
} from "../../../util/api-functions/query-helpers";
import { saveParse } from "../../../util/functions";
import getDateStrings from "../../../util/api-functions/get-date-strings";
import getRspInfoFromConcept from
	"../../../util/api-functions/end-points/get-rsp-info-from-concept";











const logging = true;





const handler = async (req, res) => {
	const { category: unparsed, brand, concept, cat } = req.query;
	const dateStrings = getDateStrings();
	const allMode = brand === allBrandsText;
	if (allMode) {
		console.log("WOOOOP");
	}
	const allFromBrandMode = concept === allConceptsFromBrandText(brand);
	if (concept && (concept !== "undefined" || cat === "umfeld" || allMode)) {

		try {
			const category = saveParse(unparsed);

			if (req.method === "GET") {
				if (category[0] !== "umfeld") {
					logging && console.time(`${brand} - ${concept} categoryInfo`);
					const categoryInfo = await getCategoryInfo(cat);
					logging && console.timeEnd(`${brand} - ${concept} categoryInfo`);
					const {headers, body} = await getRspInfoFromConcept(category, brand, saveParse(concept), cat, categoryInfo, dateStrings, allMode, allFromBrandMode);
					return res.json({headers, body});
				} else {
					let products;
					if (allMode) {
						products = await getCompetitorInfo();
					} else if (allFromBrandMode) {
						products = await getAllCompetitorProductsFromBrand(brand);
					} else {
						products = await getCompetitorProducts(brand, saveParse(concept));
					}
					const {ids} = getCompetitorCodes(products);
					const measurements = await getCompetitorMeasurements(ids, dateStrings);
					const retailers = await getRetailers("fds");
					const retailerMap = getRetailerMap(retailers);
					const {actualRetailers, measurementsById} = getRetailersAndCompetitorMeasurementsPerId(measurements, retailerMap, dateStrings);
					const headers = getHeaders(actualRetailers, retailerMap);
					const body = getCompetitorBody(products, measurementsById, brand, concept, actualRetailers, retailerMap);
					return res.json({headers, body});


				}
			} else {
				res.status(400).json({ message: `Does not support a ${req.method} request` });
			}
		} catch (e) {

			res.status(500).json({ message: e.message});
		}
	} else {
		res.status(204).json("no info yet");
	}
};

export default handler;
