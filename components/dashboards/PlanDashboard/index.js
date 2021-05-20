import React, { createContext } from "react";

import Sider from "../../Sider";
import Background from "../../Background";
import View from "../../View";

import DashboardContainer from "../DashboardContainer";
import DashboardHeader from "../DashboardHeader";
import DashboardContent from "../DashboardContent";
import DashboardFooter from "../DashboardFooter";

import ConceptSider from "../subcomponents/ConceptSider";

import PlanDashboardTitle from "./PlanDashboardTitle";

import useGlobalState from "../../../util/useGlobalState";

import candyPinkBackgrund from "../../../res/candy-pink-background.jpg";



export const ActiveConcept = createContext();

const PlanDashboard = () => {
	const ProvideActiveState = useGlobalState(ActiveConcept);


	return (
		<ProvideActiveState>
			<Background image={candyPinkBackgrund}>
				<Sider title="Pricing Tool"/>
				<View rightSider>
					<DashboardContainer type="with-header-and-footer">
						<DashboardHeader>
							<PlanDashboardTitle/>
						</DashboardHeader>
						<DashboardContent>

						</DashboardContent>
						<DashboardFooter>

						</DashboardFooter>
					</DashboardContainer>
				</View>
				<ConceptSider concepts={["concept1", "concept2"]}/>
			</Background>
		</ProvideActiveState>
	);
};

export default PlanDashboard;
