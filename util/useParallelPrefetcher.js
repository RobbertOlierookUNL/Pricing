import { mutate } from "swr";

import { allConceptsFromBrandText } from "../lib/config";



const asyncPreFetch = async (baseUrl, params) => {
	const url = `/api/${baseUrl}${params ? "?" : ""}${params ? Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&") : ""}`;
	const res = await fetch(url);
	const results = res.json();
	mutate(url, results);
	return results;
};

const preFetch = (baseUrl, params) => {
	const url = `/api/${baseUrl}${params ? "?" : ""}${params ? Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&") : ""}`;
	const results = fetch(url).then(res => res.json());
	mutate(url, results);
	return results;
};

export const parallelPrefetcher = async (loadingState, thisCategories, brands, cat) => {
	console.log({brands, loadingState});
	if (brands && !loadingState) {
		const category = JSON.stringify(thisCategories);
		for (const brand of brands) {
			console.log("hi");
			const conceptMap = await asyncPreFetch("rsp/get-all-concepts-from-brand", {category, brand, cat});
			const mConceptMap = {...conceptMap};
			mConceptMap[allConceptsFromBrandText(brand)] = allConceptsFromBrandText(brand);
			const concepts = Object.keys(mConceptMap);
			for (const cc of concepts) {
				const c = mConceptMap[cc];
				const concept = Array.isArray(c) ? JSON.stringify(c) : c;
				preFetch("rsp/get-rsp-info-from-concept", {category, brand, concept, cat});
			}
		}
	}
};
