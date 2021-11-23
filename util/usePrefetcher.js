import { mutate } from "swr";
import React from "react";

import { allBrandsText, allConceptsFromBrandText } from "../lib/config";
import useConfig from "./useConfig";


function makeSingle(generator) {
	let globalNonce;
	return async function(...args) {
		const localNonce = globalNonce = new Object();

		const iter = generator(...args);
		let resumeValue;
		for (;;) {
			const n = iter.next(resumeValue);
			if (n.done) {
				return n.value;
			}

			resumeValue = await n.value;
			if (localNonce !== globalNonce) {
				console.log("PREFETCHER | EARLY RETURN");
				return;
			}
		}
	};
}


const preFetch = (baseUrl, params) => {
	const url = `/api/${baseUrl}${params ? "?" : ""}${params ? Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&") : ""}`;
	const results = fetch(url).then(res => res.json());
	mutate(url, results);
	return results;
};

function* preFetchAll(doSomething, category, allBrands=[], allConcepts=[], thisBrand, thisConcept, done, cat){
	if (doSomething) {
		const concepts = (thisBrand === allBrandsText) ? allConcepts : [...allConcepts, allConceptsFromBrandText(thisBrand)];
		for (const concept of concepts) {
			if (concept != thisConcept) {
				yield preFetch("rsp/get-rsp-info-from-concept", {category, brand: thisBrand, concept, cat});
				console.log(`PREFETCHER | prefetched ${thisBrand} ${concept}`);
			}
		}
		for (const brand of [...allBrands, allBrandsText]) {
			if (brand != thisBrand) {
				const concepts = yield preFetch("rsp/get-all-concepts-from-brand", {category, brand});
				console.log(`PREFETCHER | prefetched ${brand}`);

				const allConcepts = brand === allBrandsText ? concepts : [...concepts, allConceptsFromBrandText(brand)];
				for (const concept of allConcepts) {
					yield preFetch("rsp/get-rsp-info-from-concept", {category, brand, concept, cat});
					console.log(`PREFETCHER | prefetched ${brand} ${concept}`);

				}
			}
		}
		done.current=true;
		console.log("PREFETCHER | done");

	}
	else {
		console.log("PREFETCHER | stop");
	}
}

const prefetcher = makeSingle(preFetchAll);


const usePrefetcher = (loading, thisCategories, thisBrand, thisConcept, allBrands, allConcepts, data, cat) => {
	const done = React.useRef(false);
	React.useEffect(() => {
		if (!done.current && !loading && Array.isArray(allBrands) && Array.isArray(allConcepts)) {
			const category = JSON.stringify(thisCategories);
			console.log({tag: "prefetcher", data});
			prefetcher(true, category, allBrands, allConcepts, thisBrand, thisConcept, done, cat);
		}
	}, [loading, Array.isArray(allBrands), Array.isArray(allConcepts)]);
	React.useEffect(() => {
	  return () => prefetcher(false);
	}, []);
};

export default usePrefetcher;
