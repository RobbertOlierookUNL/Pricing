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

export function useMutations(category, interval) {
	return createSwrHook("mutations/get-mutations", "mutations", {interval, category});
}

export function useCategoriesFromCategory(category) {
	return createSwrHook("rsp/get-categories-from-category", "categories", {category});
}

export function useBrandsFromCategory(categories, cat) {
	const category = JSON.stringify(categories);
	return createSwrHook("rsp/get-all-brands-from-category", "brands", {category, cat});
}

export function useConceptsFromBrand(categories, brand, cat) {
	const category = JSON.stringify(categories);
	return createSwrHook("rsp/get-all-concepts-from-brand", "concepts", {category, brand, cat});
}

export function useDataFromConcept(categories, brand, concept, cat) {
	const category = JSON.stringify(categories);
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
