import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SnackbarProvider from "react-simple-snackbar";

import candyPinkBackground from "res/candy-pink-background.jpg";

import { allBrandsText, allConceptsFromBrandText } from "../../../lib/config";
import {
	createAooFromServerData,
	downloadExcelFromAoo,
} from "../../../util/functions";
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




















const PlanDashboard = ({category: categories, brands, conceptsByBrand, data: serverData, dataByConceptsByBrand}) => {
	const [selectAllState, setSelectAllState] = useState({value: "unset", done: true});
	const router = useRouter();
	console.log({categories, brands, conceptsByBrand, serverData});

	const category = useCategory();



	const [{nextStep, advice}, adviceDispatch] = useStore();

	const [activeBrand, setActiveBrand] = useConfig("lastActiveBrand");
	const [activeConcept, setActiveConcept] = useConfig("lastActiveConcept");
	const [volumeMode, setVolumeMode] = useConfig("volumeMode");

	const toggleVolumeMode = () => {
		setVolumeMode(!volumeMode);
	};

	const superDownload = () => {
		 downloadExcelFromAoo(createAooFromServerData(serverData), "db-dump-"+category+"-"+new Date().toLocaleString());
	};


	const handleSetActiveBrand = value => setActiveBrand({...activeBrand, [category]: value});
	const handleSetActiveConcept = value => setActiveConcept({...activeConcept, [category]: {...activeConcept?.[category], [brand]: value}});



	// const [defaultBrand, setDefaultBrand] = useState(brands?.[0];)
	// const [defaultConcept, setDefaultConcept] = useState()
	const defaultBrand = brands?.[0];
	const brand = activeBrand?.[category] || defaultBrand;

	const conceptMap = {...conceptsByBrand?.[brand]};
	conceptMap[allConceptsFromBrandText(brand)] = allConceptsFromBrandText(brand);
	const concepts = Object.keys(conceptMap);
	const defaultConcept = (brand === allBrandsText ? allBrandsText : concepts?.[0]);
	const concept = activeConcept?.[category]?.[brand] || defaultConcept;

	const filteredBody = category === "umfeld" || serverData?.body?.filter(e => {
		if (brand === allBrandsText) {
			return true;
		}
		if (concept === allConceptsFromBrandText(brand)) {
			return e.brand === brand;
		}
		return e.brand === brand && e.concept === concept;
	});
	const filteredData = category === "umfeld" ? dataByConceptsByBrand[brand][concept] : {headers: serverData?.headers, body: filteredBody, savePriceCheck: serverData?.savePriceCheck || "wait", lastRefresh: serverData?.lastRefresh};
	const {data: swrData, dataIsLoading} = useDataFromConcept(categories, brand, conceptMap[concept], category);
	console.log({dataIsLoading, swrData, filteredData});
	const data = dataIsLoading ? filteredData : swrData;
	const savePriceCheck = data?.savePriceCheck;
	const lastRefresh =  data?.lastRefresh;
	console.log({lastRefresh});

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
			<Sider title="RSP Monitor" lastRefresh={lastRefresh} savePriceCheck={savePriceCheck}/>

			<View rightSider>
				<SnackbarProvider>
					<DashboardContainer type="with-header-and-footer">
						<DashboardHeader>
							<PlanDashboardTitle/>
							<div onClick={toggleVolumeMode} className="float-right clickable">Volumeloosheid {volumeMode ? "selecteerbaar maken" : "onselecteerbaar maken"}</div>

						</DashboardHeader>
						<DashboardContent>
							<PlanDashboardContent data={data} errorState={false} loadingState={router.isFallback} doSelectAll={{...selectAllState, execute}}/>
						</DashboardContent>
						<DashboardFooter>
							<DashboardFooterButtonContainer>
								<PlanDashboardButtons selectAll={selectAll} download={superDownload} savePriceCheck={savePriceCheck}/>
							</DashboardFooterButtonContainer>
						</DashboardFooter>
					</DashboardContainer>
				</SnackbarProvider>
			</View>

			<ConceptSider brands={brands} defaultBrand={defaultBrand} brandsIsLoading={router.isFallback} defaultConcept={defaultConcept} concepts={concepts} conceptsIsLoading={router.isFallback}/>
			<style jsx>{`
				.float-right {
					float: right;
					color: white;
					right: 15px;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					font-size: 1em;
					transition: 250ms font-size;

				}
				.float-right:hover {
					font-size: 1.05em;
				}
			`}</style>
		</Background>
	);
};

export default PlanDashboard;



// const {categories, categoriesIsLoading, categoriesReturnsError} = useCategoriesFromCategory(category);
// const fallbackCategories = categories || serverCategories;
// const {brands, brandsIsLoading, brandsReturnsError} = useBrandsFromCategory(fallbackCategories, category);
// const fallbackBrands = brands || serverBrands;

// const {concepts: preConceptMap, conceptsIsLoading, conceptsReturnsError} = useConceptsFromBrand(categories, b, category);
// const fallbackConcepts = conceptsByBrand[brand];

// const data = dataByConceptsByBrand[brand][concept];
// console.log({data});

// const {eans, eansIsLoading, eansReturnsError} = useEansFromConcept(categories, brand, concept);
// const mode = brand === allBrandsText ? "getAllFromCategory" : "ean";
// const {data, dataIsLoading, dataReturnsError} = useDataFromEans(eans, mode, categories);


// const errorState = categoriesReturnsError || brandsReturnsError || conceptsReturnsError || dataReturnsError;
// const loadingState = categoriesIsLoading || brandsIsLoading || conceptsIsLoading || dataIsLoading;
// // parallelPrefetcher(loadingState, categories, brands, category);
// usePrefetcher(loadingState, categories, brand, conceptMap[concept], conceptMap, brands, concepts, data, category);

// useEffect(() => {
//   brands && handleSetActiveBrand(defaultBrand);
// }, [brands]);
//
// useEffect(() => {
// 	concepts && handleSetActiveConcept(defaultConcept);
// }, [concepts]);
