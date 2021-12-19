import { allBrandsText, allConceptsFromBrandText } from "../lib/config";
import {
	useBrandsFromCategory,
	useCategoriesFromCategory,
	useConceptsFromBrand,
	useDataFromConcept,
	useMutations,
} from "./useSwr-hooks";
import useConfig from "./useConfig";
import usePrefetcher from "./usePrefetcher";


const usePrefetchCategory = category => {
	const {categories, categoriesIsLoading} = useCategoriesFromCategory(category);
	const {brands, brandsIsLoading} = useBrandsFromCategory(categories, category);
	const defaultBrand = brands?.[0];
	const brand = defaultBrand;
	const {concepts: preConceptMap, conceptsIsLoading, conceptsReturnsError} = useConceptsFromBrand(categories, brand, category);
	const conceptMap = {...preConceptMap};
	conceptMap[allConceptsFromBrandText(brand)] = allConceptsFromBrandText(brand);
	const concepts = Object.keys(conceptMap);
	const defaultConcept = concepts?.[0];
	const concept = defaultConcept;
	const {data, dataIsLoading} = useDataFromConcept(categories, brand, concept, category);
	const [intervalMode] = useConfig("intervalMode");
	useMutations(category, intervalMode);
	console.log({data});
	const loadingState = categoriesIsLoading || brandsIsLoading || conceptsIsLoading || dataIsLoading;
	usePrefetcher(loadingState, categories, brand, conceptMap[concept], conceptMap, brands, concepts, data, category);


};

export default usePrefetchCategory;
