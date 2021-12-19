
import {
	getAllDetailedProducts,
	getAllProducts,
	getCategories,
	getCategoryInfo,
	getCompetitorInfo,
	getCompetitorMeasurements,
	getMeasurements,
	getRetailers,
	getSwitchIds
} from "../../../util/api-functions/queries";
import {
	getCodes,
	getCompetitorCodes,
	getMasterEanMap,
	getMutationsFromCompetitorMeasurements,
	getMutationsFromMeasurements,
	getRetailerMap
} from "../../../util/api-functions/query-helpers";
import { getDateStringFromValue } from "../../../lib/config";
import getDateStrings from "../../../util/api-functions/get-date-strings";
















const getMutations = async (category, i) => {
	if (category !== "umfeld") {

		const {[i]: intervalDate, todayString } = getDateStrings();

		console.log(0);
		const categories = await getCategories(category);
		console.log({categories});

		const categoryInfo = await getCategoryInfo(category);
		console.log(1);
		const products = await getAllDetailedProducts(categories, categoryInfo);
		console.log(2);
		const {eans: productTableEans, eanToDescription, eanToMrdrs} = getCodes(products);
		const switchIds = await getSwitchIds(productTableEans);
		console.log(switchIds);
		const {switchIdToCodes, eanToSwitchId, eans} = getMasterEanMap(switchIds, eanToMrdrs);


		console.log(3, {eans});
		const measurements = await getMeasurements(eans, {intervalDate, todayString});
		console.log(4);

		const retailers = await getRetailers(category);
		const retailerMap = getRetailerMap(retailers);
		console.log(4);
		const mutations = getMutationsFromMeasurements(measurements, eanToDescription, eanToSwitchId, switchIdToCodes, {intervalDate, todayString}, categoryInfo, retailerMap);

		return mutations;
	} else {
		const {[i]: intervalDate, todayString } = getDateStrings();
		const competitorInfo = await getCompetitorInfo();
		// console.log({competitorInfo});

		const {ids, idToDescription} = getCompetitorCodes(competitorInfo);
		const measurements = await getCompetitorMeasurements(ids, {intervalDate, todayString});
		const retailers = await getRetailers("fds");
		const retailerMap = getRetailerMap(retailers);
		const mutations = getMutationsFromCompetitorMeasurements(measurements, idToDescription, {intervalDate, todayString}, retailerMap);
		return mutations;
	}
};

export default getMutations;
