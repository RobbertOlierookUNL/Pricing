import {
	getBody,
	getHeaders,
	getMasterEanMap,
	getRetailerMap,
	getRetailersAndMeasurementsPerEan,
	getVolumeMap,
} from "../query-helpers";
import {
	getMeasurements,
	getRelevantEansFromBrand,
	getRelevantEansFromCategory,
	getRelevantEansFromConcept,
	getRetailers,
	getSwitchIds,
	getVolumes,
} from "../queries";
import { saveParse } from "../../functions";

const logging = true;

const getRspInfoFromConcept = async (category, brand, concept, cat, categoryInfo, dateStrings, allMode, allFromBrandMode) => {

	let productTableEans;
	let eanMap;
	console.log({allMode});
	if (allMode)  {
		const {eans, eanToMrdrs} =  await getRelevantEansFromCategory(category, categoryInfo);
		productTableEans = eans;
		eanMap = eanToMrdrs;
		if (allMode) {
			console.log({eanMap, productTableEans});
		}
	} else if (allFromBrandMode) {
		const {eans, eanToMrdrs} =  await getRelevantEansFromBrand(category, brand, categoryInfo);
		productTableEans = eans;
		eanMap = eanToMrdrs;
	} else {
		const {eans, eanToMrdrs} = await getRelevantEansFromConcept(category, brand, concept, categoryInfo);
		productTableEans = eans;
		eanMap = eanToMrdrs;
	}
	logging && console.log({productTableEans, eanMap});

	const switchIds = await getSwitchIds(productTableEans);
	const {switchIdToCodes, eanToSwitchId, mrdrs, eans} = getMasterEanMap(switchIds, eanMap);
	logging && console.log(`${brand} - ${concept} - #products: ${productTableEans.length} - 0%`);
	// const {eanToMrdr, eans, mrdrs} = getCodes(products);
	logging && console.time(`${brand} - ${concept} measurements`);
	const measurements = await getMeasurements(eans, dateStrings);
	logging && 	console.timeEnd(`${brand} - ${concept} measurements`);
	logging && console.log(`${brand} - ${concept} - #measurements: ${measurements.length} - 25%`);
	const volumes = await getVolumes(mrdrs);
	const mrdrToVolumeInfo = getVolumeMap(volumes);
	logging && console.log(`${brand} - ${concept} - #volumes found: ${volumes.length} - 50%`);
	const retailers = await getRetailers(cat);
	const retailerToInfo = getRetailerMap(retailers);
	const {actualRetailers, measurementsByEan} = getRetailersAndMeasurementsPerEan(measurements, retailerToInfo, mrdrToVolumeInfo, eanToSwitchId, switchIdToCodes, dateStrings);
	const headers = getHeaders(actualRetailers, retailerToInfo);
	logging && console.log(`${brand} - ${concept} - #retailers found: ${actualRetailers.size} - 75%`);


	const body = getBody(measurementsByEan, switchIdToCodes, eanToSwitchId, actualRetailers, retailerToInfo, mrdrToVolumeInfo);
	logging && console.log(`${brand} - ${concept} - #body found: ${body} - 100%`);
	return {headers, body};
};

export default getRspInfoFromConcept;
