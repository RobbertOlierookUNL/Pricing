import { useRouter } from "next/router";
import React, {useContext, useEffect} from "react";

import { ActiveConcept, ActiveBrand } from "pages/[category]/plan";
import { useCategoriesFromCategory, useBrandsFromCategory, useConceptsFromBrand, useEansFromConcept, useDataFromEans } from "util/useSwr-hooks";
import candyPinkBackground from "res/candy-pink-background.jpg";

import { AdviceStore } from "../../../pages/_app";
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





const PlanDashboard = () => {
	const Router = useRouter();
	const category = Router.query.category;

	const [activeConcept, setActiveConcept] = useContext(ActiveConcept);
	const [activeBrand, setActiveBrand] = useContext(ActiveBrand);
	const [{nextStep, advice}, adviceDispatch] = useContext(AdviceStore);



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
			adviceDispatch({type: "setConcept", category, brand: activeBrand, concept: activeConcept});
		}
	}, [nextStep]);

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
						<PlanDashboardContent data={data} errorState={errorState} loadingState={loadingState}/>
					</DashboardContent>
					<DashboardFooter>
						<DashboardFooterButtonContainer>
							<PlanDashboardButtons/>
						</DashboardFooterButtonContainer>
					</DashboardFooter>
				</DashboardContainer>
			</View>

			<ConceptSider brands={brands} concepts={concepts}/>
		</Background>
	);
};

export default PlanDashboard;
