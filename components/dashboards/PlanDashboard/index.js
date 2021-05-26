import React, { createContext } from "react";

import Sider from "../../Sider";
import Background from "../../Background";
import View from "../../View";


import DashboardContainer from "../DashboardContainer";
import DashboardHeader from "../DashboardHeader";
import DashboardContent from "../DashboardContent";
import DashboardFooter from "../DashboardFooter";

import ConceptSider from "../subcomponents/ConceptSider";
import DashboardFooterButtonContainer from "../subcomponents/DashboardFooterButtonContainer";

import PlanDashboardTitle from "./PlanDashboardTitle";
import PlanDashboardContent from "./PlanDashboardContent";
import PlanDashboardButtons from "./PlanDashboardButtons";

import useGlobalState from "../../../util/useGlobalState";

import candyPinkBackground from "../../../res/candy-pink-background.jpg";



export const ActiveConcept = createContext();

const PlanDashboard = () => {
	const ProvideActiveState = useGlobalState(ActiveConcept);


	return (
		<ProvideActiveState>
			<Background image={candyPinkBackground}>
				<Sider title="Pricing Tool"/>

				<View rightSider>
					<DashboardContainer type="with-header-and-footer">
						<DashboardHeader>
							<PlanDashboardTitle/>
						</DashboardHeader>
						<DashboardContent>
							<PlanDashboardContent/>
						</DashboardContent>
						<DashboardFooter>
							<DashboardFooterButtonContainer>
								<PlanDashboardButtons/>
							</DashboardFooterButtonContainer>
						</DashboardFooter>
					</DashboardContainer>
				</View>

				<ConceptSider concepts={["concept1", "concept2", "concept3"]}/>
			</Background>
		</ProvideActiveState>
	);
};

export default PlanDashboard;
