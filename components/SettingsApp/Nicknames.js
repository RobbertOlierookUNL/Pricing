import React, {useState} from "react";

import {
	useBrandsFromCategory,
	useCategoriesFromCategory,
	useConceptsFromBrand
} from "../../util/useSwr-hooks";
import ConceptTable from "./ConceptTable";
import Dropdown from "./Dropdown";
import useCategory from "../../util/useCategory";




const Nicknames = ({serverCategories,	serverBrands,	conceptsByBrand}) => {
	const category = useCategory();
	const {categories} = useCategoriesFromCategory(category, {fallbackData: serverCategories, refreshInterval: 30000});

	const {brands} = useBrandsFromCategory(categories || serverCategories, category, {fallbackData: serverBrands});
	const [selectedBrand, setSelectedBrand] = useState(false);
	const serverConcepts = conceptsByBrand[selectedBrand];

	const {concepts} = useConceptsFromBrand(categories || serverCategories, selectedBrand, category, {fallbackData: serverConcepts});

	const updateSelectedBrand = e => {
		setSelectedBrand(e.target.value);
	};


	return (
		<div>
			<div>Merk:</div>
			<Dropdown value={selectedBrand} onChange={updateSelectedBrand} options={brands || serverBrands} emptyDefault emptyIsLoading/>
			{/* {conceptsIsLoading && selectedBrand && "Loading..."} */}
			{/* {!conceptsIsLoading && concepts &&  */}
			{selectedBrand && <ConceptTable concepts={concepts || serverConcepts} brand={selectedBrand} cluster={category.toUpperCase()}/>}
		</div>
	);
};


export default Nicknames;
