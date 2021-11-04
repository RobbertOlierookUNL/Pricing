import { mutate } from "swr";
import React from "react";



const preFetch = (baseUrl, params) => {
	const url = `/api/${baseUrl}${params ? "?" : ""}${params ? Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&") : ""}`;
	const results = fetch(url).then(res => res.json());
	mutate(url, results);
	return results;
};

const preFetchAll = async (category, allBrands, allConcepts, thisBrand, thisConcept) => {
	for (const concept of allConcepts) {
		if (concept != thisConcept) {
			preFetch("rsp/get-rsp-info-from-concept", {category, brand: thisBrand, concept});
		}
	}
	for (const brand of allBrands) {
		if (brand != thisBrand) {
			const concepts = await preFetch("rsp/get-all-concepts-from-brand", {category, brand});
			for (const concept of concepts) {
				preFetch("rsp/get-rsp-info-from-concept", {category, brand, concept});
			}
		}
	}

};

const usePrefetcher = (loading, thisCategories, thisBrand, thisConcept, allBrands, allConcepts, data) => {
	React.useEffect(() => {
		if (!loading && Array.isArray(allBrands) && Array.isArray(allConcepts)) {
			const category = JSON.stringify(thisCategories);
			console.log({tag: "prefetcher", data});
			preFetchAll(category, allBrands, allConcepts, thisBrand, thisConcept);
		}
	}, [loading, Array.isArray(allBrands), Array.isArray(allConcepts)]);

};

export default usePrefetcher;
