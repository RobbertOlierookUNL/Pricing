import React, { createContext } from "react";


import PlanDashboard from "../../../components/dashboards/PlanDashboard";
import useGlobalState from "../../../util/useGlobalState";



export const ActiveConcept = createContext();
export const ActiveBrand = createContext();
export const RetailerMode = createContext();




const PlanDashboardPage = () => {

	const ProvideActiveConceptState = useGlobalState(ActiveConcept);
	const ProvideActiveBrandState = useGlobalState(ActiveBrand);
	const ProvideRetailerModeState = useGlobalState(RetailerMode);



	return (
		<ProvideRetailerModeState>
			<ProvideActiveConceptState>
				<ProvideActiveBrandState>
					<PlanDashboard/>
				</ProvideActiveBrandState>
			</ProvideActiveConceptState>
		</ProvideRetailerModeState>

	);
};


export default PlanDashboardPage;
