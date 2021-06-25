import useSWR from "swr";

function fetcher(url) {
	return window.fetch(url).then((res) => res.json());
}

const createSwrHook = (url, dataName = "data", params) => {
	const { data, error } = useSWR(`/api/${url}${params ? "?" : ""}${params ? Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&") : ""}`, fetcher);
	return {
		[dataName]: data,
		[`${dataName}IsLoading`]: !error && !data,
		[`${dataName}ReturnsError`]: error,
	};
};


export function useBrandsFromCategory(category) {
	return createSwrHook("rsp/get-all-brands-from-category", "brands", {category});
}

export function useConceptsFromBrand(category, brand) {
	return createSwrHook("rsp/get-all-concepts-from-brand", "concepts", {category, brand});
}

export function useEansFromConcept(category, brand, concept) {
	return createSwrHook("rsp/get-all-eans-from-concept", "eans", {category, brand, concept});
}
export function useDataFromEans(eans) {
	return createSwrHook("rsp/get-rsp-info-from-eans", "data", {eans: JSON.stringify(eans)});
}


// export function useBrandsFromCategory(category) {
//   	const { data, error } = useSWR(`/api/rsp/get-all-brands-from-category?category=${category}`, fetcher);
//   	return {
//   		brands: data,
//   		brandsAreLoading: !error && !data,
//   		brandsReturnError: error,
//   	};
// }
//
// export function useConceptsFromBrand(category, brand) {
// 	const { data, error } = useSWR(`/api/rsp/get-all-concepts-from-brand?category=${category}&brand=${brand}`, fetcher);
// 	return {
// 		concepts: data,
// 		conceptsAreLoading: !error && !data,
// 		conceptsReturnError: error,
// 	};
// }
