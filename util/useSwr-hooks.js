import useSWR from "swr";

function fetcher(url) {
	return window.fetch(url).then((res) => res.json());
}

const createSwrHook = (url, dataName = "data", params) => {
	const { data, error } = useSWR(`/api/${url}${params ? "?" : ""}${params ? Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&") : ""}`, fetcher);
	return {
		[dataName]: data,
		[`${dataName}IsLoading`]: !error && !data,
		[`${dataName}ReturnsError`]: error,
	};
};

export function useDistance() {
	return createSwrHook("distance/get-cap-distance", "distance");
}

export function useRetailers() {
	return createSwrHook("rsp/get-retailer-info", "retailers");
}


export function useCategoriesFromCategory(category) {
	return createSwrHook("rsp/get-categories-from-category", "categories", {category});
}

export function useBrandsFromCategory(categories) {
	const category = JSON.stringify(categories);
	return createSwrHook("rsp/get-all-brands-from-category", "brands", {category});
}

export function useConceptsFromBrand(categories, brand) {
	const category = JSON.stringify(categories);
	return createSwrHook("rsp/get-all-concepts-from-brand", "concepts", {category, brand});
}

export function useEansFromConcept(categories, brand, concept) {
	const category = JSON.stringify(categories);
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
