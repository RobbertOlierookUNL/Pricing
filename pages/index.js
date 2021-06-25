import React from "react";
import CategoryPickApp from "../components/CategoryPickApp";
import { useBrandsFromCategory, useConceptsFromBrand, useEansFromConcept, useDataFromEans } from "util/useSwr-hooks";
import { db } from "lib/db";

const Home = () => {

	const {brands} = useBrandsFromCategory("PC");
	const {concepts} = useConceptsFromBrand("PC", brands?.[0]);
	const {eans} = useEansFromConcept("PC", brands?.[0], concepts?.[0]);
	const {data} = useDataFromEans(eans);
	//
	console.log({brands, concepts, eans, data });
	return (
		<CategoryPickApp/>
	);
};


export default Home;
