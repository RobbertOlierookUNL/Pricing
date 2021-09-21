import React, {useContext, useEffect, useState} from "react";

import { ActiveConcept, ActiveBrand } from "pages/[category]/plan";
import { useCategoriesFromCategory, useBrandsFromCategory, useConceptsFromBrand, useEansFromConcept, useDataFromEans } from "util/useSwr-hooks";
import candyPinkBackground from "res/candy-pink-background.jpg";

import { setConcept } from "../../../util/reducers";
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










const PlanDashboard = () => {
	const [selectAllState, setSelectAllState] = useState({value: "unset", done: true});

	const category = useCategory();

	const [activeConcept, setActiveConcept] = useContext(ActiveConcept);
	const [activeBrand, setActiveBrand] = useContext(ActiveBrand);
	const [{nextStep, advice}, adviceDispatch] = useStore();



	const {categories, categoriesIsLoading, categoriesReturnsError} = useCategoriesFromCategory(category);
	const {brands, brandsIsLoading, brandsReturnsError} = useBrandsFromCategory(categories);
	const {concepts, conceptsIsLoading, conceptsReturnsError} = useConceptsFromBrand(categories, activeBrand);
	const {eans, eansIsLoading, eansReturnsError} = useEansFromConcept(categories, activeBrand, activeConcept);
	const {data, dataIsLoading, dataReturnsError} = useDataFromEans(eans);


	const errorState = categoriesReturnsError || brandsReturnsError || conceptsReturnsError || eansReturnsError || dataReturnsError;
	const loadingState = categoriesIsLoading || brandsIsLoading || conceptsIsLoading || eansIsLoading || dataIsLoading;

	useEffect(() => {
	  brands && setActiveBrand(brands?.[0]);
	}, [brands]);

	useEffect(() => {
		concepts && setActiveConcept(concepts?.[0]);
	}, [concepts]);

	useEffect(() => {
		if (nextStep) {
			adviceDispatch(setConcept(category, activeBrand, activeConcept));
		}
	}, [nextStep]);

	const selectAll = value => () => {
		setSelectAllState({value, done: false});
	};

	const execute = () => {
		setSelectAllState({...selectAllState, done: true});
	};

	console.log({category, categories, brands, concepts, eans, data, advice});
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

			<ConceptSider brands={brands} concepts={concepts}/>
		</Background>
	);
};

export default PlanDashboard;
