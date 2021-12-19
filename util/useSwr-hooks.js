import useSWR from "swr";

function fetcher(url) {
	return window.fetch(url).then((res) => res.json());
}

export const createUrl = (url, params) => (
	`/api/${url}${params ? "?" : ""}${params ? Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&") : ""}`
);

const createSwrHook = (url, dataName = "data", params, options) => {
	const { data, error } = useSWR(createUrl(url, params), fetcher, options);
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

export function useMutations(category, interval) {
	return createSwrHook("mutations/get-mutations", "mutations", {interval, category});
}

export function useCategoriesFromCategory(category, options) {
	return createSwrHook("rsp/get-categories-from-category", "categories", {category}, options);
}

export function useBrandsFromCategory(categories, cat, options) {
	const category = JSON.stringify(categories);
	return createSwrHook("rsp/get-all-brands-from-category", "brands", {category, cat}, options);
}

export function useConceptsFromBrand(categories, brand, cat, options,) {
	const category = JSON.stringify(categories);
	return createSwrHook("rsp/get-all-concepts-from-brand", "concepts", {category, brand, cat}, options);
}

export function useDataFromConcept(categories, brand, c, cat) {
	const category = JSON.stringify(categories);
	const concept = Array.isArray(c) ? JSON.stringify(c) : c;

	return createSwrHook("rsp/get-rsp-info-from-concept", "data", {category, brand, concept, cat});
}

// export function useEansFromConcept(categories, brand, concept) {
// 	const category = JSON.stringify(categories);
// 	return createSwrHook("rsp/get-all-eans-from-concept", "eans", {category, brand, concept});
// }
// export function useDataFromEans(eans, mode, categories) {
// 	const sendEans = mode === "ean" ? JSON.stringify(eans) : "";
// 	const category = JSON.stringify(categories);
// 	return createSwrHook("rsp/get-rsp-info-from-eans", "data", {eans: sendEans, mode, category});
// }


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
