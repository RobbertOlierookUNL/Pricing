import React from "react";

import {
	allBrandsText,
	categories,
	fallback,
	revalidate
} from "../../../lib/config";
import {
	getBrands,
	getCategories,
	getCategoryInfo,
	getConceptNicknames,
	getConcepts,
	getValidEans
} from "../../../util/api-functions/queries";
import { getNicknamesMap } from "../../../util/api-functions/query-helpers";
import SettingsApp from "../../../components/SettingsApp";














const SettingsAppPage = ({categories,	brands,	conceptsByBrand}) => {
	return (
		<SettingsApp {...{categories,	brands,	conceptsByBrand}}/>
	);
};


export default SettingsAppPage;

export async function getStaticProps({ params }) {

	const {category} = params;
	console.log("gsp", {category});

	const categories = await getCategories(category);
	console.log("gsp", {categories});

	const categoryInfo = await getCategoryInfo(category);
	console.log("gsp", {categoryInfo});

	const validEans = await getValidEans();
	console.log("gsp", {validEans});

	const brands = await getBrands(categories, categoryInfo, validEans);
	console.log("gsp", {brands});


	const conceptsByBrand = {};
	const fallback = {};


	for (const brand of [...brands, allBrandsText]) {
		console.log("gsp", {brand});

		const concepts = await getConcepts(categories, brand, categoryInfo, validEans);
		const conceptNicknames = await getConceptNicknames(category, brand);
		const nicknamesMap = getNicknamesMap(concepts, conceptNicknames);

		conceptsByBrand[brand] = nicknamesMap;
	}
	console.log("gsp", {conceptsByBrand});


	return {
		props: {
			fallback,
			categories,
			brands,
			conceptsByBrand,
		},
		revalidate,
	};
}

export const getStaticPaths = async () => {
	// TODO: makeDynamic
	const paths = categories.map((category) => ({
		params: { category },
	}));
	return { paths, fallback };

};
