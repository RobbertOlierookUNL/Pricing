import React from "react";

import { allBrandsText, allConceptsFromBrandText } from "../../../lib/config";
import {
	getAllCompetitorProductsFromBrand,
	getAllConceptNicknames,
	getAllDetailedProducts,
	getCategories,
	getCategoryInfo,
	getCompetitorBrands,
	getCompetitorConcepts,
	getCompetitorInfo,
	getCompetitorMeasurements,
	getCompetitorProducts,
	getMeasurements,
	getRetailers,
	getSwitchIds,
	getValidEans,
	getVolumes
} from "../../../util/api-functions/queries";
import {
	getBody,
	getCodesFromDetailedProducts,
	getCompetitorBody,
	getCompetitorCodes,
	getFullBody,
	getHeaders,
	getMasterEanMap,
	getRetailerMap,
	getRetailersAndCompetitorMeasurementsPerId,
	getRetailersAndMeasurementsPerEan,
	getVolumeMap
} from "../../../util/api-functions/query-helpers";
import { propertySetter } from "../../../util/functions";
import PlanDashboard from "../../../components/dashboards/PlanDashboard";
import getDateStrings from "../../../util/api-functions/get-date-strings";










const PlanDashboardPage = (props) => {
	return (
		<PlanDashboard {...props}/>
	);
};


export default PlanDashboardPage;

export async function getStaticProps({ params }) {

	const {category: cat} = params;
	const dateStrings = getDateStrings();
	if (cat != "umfeld") {

		const category = await getCategories(cat);
		const categoryInfo = await getCategoryInfo(cat);
		const detailedProducts = await getAllDetailedProducts(category, categoryInfo);
		const validEans = await getValidEans();
		const conceptNicknames = await getAllConceptNicknames(cat);

		const {brands, conceptsByBrand, productTableEans, eanToMrdrs, eanToDescription} = getCodesFromDetailedProducts(detailedProducts, validEans, conceptNicknames, categoryInfo);
		const switchIds = await getSwitchIds(productTableEans);
		const {switchIdToCodes, eanToSwitchId, mrdrs, eans} = getMasterEanMap(switchIds, eanToMrdrs);
		const measurements = await getMeasurements(eans, dateStrings);
		const volumes = await getVolumes(mrdrs);
		const mrdrToVolumeInfo = getVolumeMap(volumes);
		const retailers = await getRetailers(cat);
		const retailerToInfo = getRetailerMap(retailers);
		const {actualRetailers, measurementsByEan} = getRetailersAndMeasurementsPerEan(measurements, retailerToInfo, mrdrToVolumeInfo, eanToSwitchId, switchIdToCodes, dateStrings);
		const headers = getHeaders(actualRetailers, retailerToInfo);
		const body = getFullBody(measurementsByEan, switchIdToCodes, eanToSwitchId, actualRetailers, retailerToInfo, mrdrToVolumeInfo, eanToDescription);

		// const brands = await getBrands(category, categoryInfo, validEans);
		//
		// const conceptsByBrand = {};
		// const dataByConceptsByBrand = {};
		//
		//
		// for (const brand of [...brands, allBrandsText]) {
		// 	const allMode = brand === allBrandsText;
		// 	const concepts = await getConcepts(category, brand, categoryInfo, validEans);
		// 	const conceptNicknames = await getConceptNicknames(cat, brand);
		// 	const preNicknamesMap = getNicknamesMap(concepts, conceptNicknames);
		// 	const nicknamesMap = allMode ? {[allBrandsText]: allBrandsText} : {...preNicknamesMap};
		// 	allMode || (nicknamesMap[allConceptsFromBrandText(brand)] = [allConceptsFromBrandText(brand)]);
		//
		// 	const visualConcepts = Object.keys(nicknamesMap);
		//
		// 	conceptsByBrand[brand] = nicknamesMap;
		//
		// 	for (const visualConcept of visualConcepts) {
		// 		const allFromBrandMode = visualConcept === allConceptsFromBrandText(brand);
		// 		const concept = nicknamesMap[visualConcept];
		// 		const {headers, body} = await getRspInfoFromConcept(category, brand, concept, cat, categoryInfo, dateStrings, allMode, allFromBrandMode);
		// 		// let productTableEans;
		// 		// if (allMode)  {
		// 		// 	productTableEans = await getRelevantEansFromCategory(categories, categoryInfo);
		// 		// } else if (allFromBrandMode) {
		// 		// 	productTableEans = await getRelevantEansFromBrand(categories, brand, categoryInfo);
		// 		// } else {
		// 		// 	productTableEans = await getRelevantEansFromConcept(categories, brand, concept, categoryInfo);
		// 		// }
		// 		// console.log({productTableEans});
		// 		// const switchIds = await getSwitchIds(productTableEans);
		// 		// console.log({switchIds});
		// 		// const {switchIdToCodes, eanToSwitchId, mrdrs, eans} = getMasterEanMap(switchIds);
		// 		// console.log({eans});
		// 		// const measurements = await getMeasurements(eans, dateStrings);
		// 		// const volumes = await getVolumes(mrdrs);
		// 		// const mrdrToVolumeInfo = getVolumeMap(volumes);
		// 		// const retailers = await getRetailers(category);
		// 		// const retailerToInfo = getRetailerMap(retailers);
		// 		// const {actualRetailers, measurementsByEan} = getRetailersAndMeasurementsPerEan(measurements, retailerToInfo, mrdrToVolumeInfo, eanToSwitchId, switchIdToCodes, dateStrings);
		// 		// const headers = getHeaders(actualRetailers, retailerToInfo);
		// 		// const body = getBody(measurementsByEan, switchIdToCodes, eanToSwitchId, actualRetailers, retailerToInfo, mrdrToVolumeInfo);
		// 		const obj = {headers: headers || null, body: body || null};
		// 		console.log({dataByConceptsByBrand, obj});
		// 		propertySetter(dataByConceptsByBrand, obj, false, brand, visualConcept);
		//
		// 	}
		// }


		return {
			props: {
				category,
				brands,
				conceptsByBrand,
				data: {headers, body}
			},
			revalidate: 60,
		};
	}else {
		const category = [cat];
		const brands = await getCompetitorBrands();
		const conceptsByBrand = {};
		const dataByConceptsByBrand = {};
		for (const brand of [...brands, allBrandsText]) {
			const concepts = await getCompetitorConcepts(brand);
			const allConcepts = brand === allBrandsText ? [allBrandsText] : [...new Set([allConceptsFromBrandText(brand), ...concepts])];
			const mappie = {};
			for (const concept of allConcepts) {
				Array.isArray(mappie[concept]) ? mappie[concept].push(concept) : mappie[concept] = [concept];
				const allMode = brand === allBrandsText;
				const allFromBrandMode = concept === allConceptsFromBrandText(brand);

				let products;
				if (allMode) {
					products = await getCompetitorInfo();
				} else if (allFromBrandMode) {
					products = await getAllCompetitorProductsFromBrand(brand);
				} else {
					products = await getCompetitorProducts(brand, mappie[concept]);
				}
				const {ids} = getCompetitorCodes(products);
				const measurements = await getCompetitorMeasurements(ids, dateStrings);
				const retailers = await getRetailers("fds");
				const retailerMap = getRetailerMap(retailers);
				const {actualRetailers, measurementsById} = getRetailersAndCompetitorMeasurementsPerId(measurements, retailerMap, dateStrings);
				const headers = getHeaders(actualRetailers, retailerMap);
				const body = getCompetitorBody(products, measurementsById, brand, concept, actualRetailers, retailerMap);
				const obj = {headers: headers || null, body: body || null};
				propertySetter(dataByConceptsByBrand, obj, false, brand, concept);

			}
			conceptsByBrand[brand]=mappie;

		}
		console.log({dataByConceptsByBrand});

		return {
			props: {
				category,
				brands,
				conceptsByBrand,
				dataByConceptsByBrand
			},
			revalidate: 60,
		};
	}
}

export const getStaticPaths = async () => {
	// TODO: makeDynamic
	const categories = ["hc", "fds", "bpc", "rf", "umfeld"];
	const paths = categories.map((category) => ({
		params: { category },
	}));
	return { paths, fallback: false };

};
