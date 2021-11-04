import React, { useEffect, useState } from "react";

import {
	useCategoriesFromCategory,
	useBrandsFromCategory,
	useConceptsFromBrand
} from "util/useSwr-hooks";
import candyPinkBackground from "res/candy-pink-background.jpg";

import { allBrandsText } from "../../../lib/config";
import { setConcept } from "../../../util/reducers";
import { useDataFromConcept } from "../../../util/useSwr-hooks";
import { useStore } from "../../../lib/Store";
import Background from "../../Background";
import ConceptSider from "../subcomponents/ConceptSider";
import DashboardContainer from "../DashboardContainer";
import DashboardContent from "../DashboardContent";
import DashboardFooter from "../DashboardFooter";
import DashboardFooterButtonContainer from "../subcomponents/DashboardFooterButtonContainer";
import DashboardHeader from "../DashboardHeader";
import PlanDashboardButtons from "./PlanDashboardButtons";
import PlanDashboardContent from "./PlanDashboardContent";
import PlanDashboardTitle from "./PlanDashboardTitle";
import Sider from "../../Sider";
import View from "../../View";
import useCategory from "../../../util/useCategory";
import useConfig from "../../../util/useConfig";
import usePrefetcher from "../../../util/usePrefetcher";














const PlanDashboard = () => {
	const [selectAllState, setSelectAllState] = useState({value: "unset", done: true});

	const category = useCategory();

	const [activeBrand, setActiveBrand] = useConfig("lastActiveBrand");
	const [activeConcept, setActiveConcept] = useConfig("lastActiveConcept");



	const handleSetActiveBrand = value => setActiveBrand({...activeBrand, [category]: value});
	const handleSetActiveConcept = value => setActiveConcept({...activeConcept, [category]: {...activeConcept?.[category], [brand]: value}});


	const [{nextStep, advice}, adviceDispatch] = useStore();



	const {categories, categoriesIsLoading, categoriesReturnsError} = useCategoriesFromCategory(category);
	const {brands, brandsIsLoading, brandsReturnsError} = useBrandsFromCategory(categories);
	const defaultBrand = brands?.[0];
	const brand = activeBrand?.[category] || defaultBrand;
	const {concepts, conceptsIsLoading, conceptsReturnsError} = useConceptsFromBrand(categories, brand);
	const defaultConcept = brand === allBrandsText ? allBrandsText : concepts?.[0];
	const concept = activeConcept?.[category]?.[brand] || defaultConcept;
	const {data, dataIsLoading, dataReturnsError} = useDataFromConcept(categories, brand, concept);
	// const {eans, eansIsLoading, eansReturnsError} = useEansFromConcept(categories, brand, concept);
	// const mode = brand === allBrandsText ? "getAllFromCategory" : "ean";
	// const {data, dataIsLoading, dataReturnsError} = useDataFromEans(eans, mode, categories);



	const errorState = categoriesReturnsError || brandsReturnsError || conceptsReturnsError || dataReturnsError;
	const loadingState = categoriesIsLoading || brandsIsLoading || conceptsIsLoading || dataIsLoading;
	usePrefetcher(loadingState, categories, brand, concept, brands, concepts, data);

	// useEffect(() => {
	//   brands && handleSetActiveBrand(defaultBrand);
	// }, [brands]);
	//
	// useEffect(() => {
	// 	concepts && handleSetActiveConcept(defaultConcept);
	// }, [concepts]);

	useEffect(() => {
		if (nextStep) {
			adviceDispatch(setConcept(category, brand, concept));
		}
	}, [nextStep]);

	const selectAll = value => () => {
		setSelectAllState({value, done: false});
	};

	const execute = () => {
		setSelectAllState({...selectAllState, done: true});
	};

	console.log({category, categories, brands, concepts, data, advice});
	return (
		<Background image={candyPinkBackground}>
			<Sider title="Pricing Tool"/>

			<View rightSider>
				<DashboardContainer type="with-header-and-footer">
					<DashboardHeader>
						<PlanDashboardTitle/>
					</DashboardHeader>
					<DashboardContent>
						<PlanDashboardContent data={data} errorState={errorState} loadingState={loadingState} doSelectAll={{...selectAllState, execute}}/>
					</DashboardContent>
					<DashboardFooter>
						<DashboardFooterButtonContainer>
							<PlanDashboardButtons selectAll={selectAll}/>
						</DashboardFooterButtonContainer>
					</DashboardFooter>
				</DashboardContainer>
			</View>

			<ConceptSider brands={brands} brandsIsLoading={brandsIsLoading} concepts={concepts} conceptsIsLoading={conceptsIsLoading}/>
		</Background>
	);
};

export default PlanDashboard;
