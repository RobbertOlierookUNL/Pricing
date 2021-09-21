import React from "react";

import { useStore } from "../../lib/Store";
import AdviceAppButtons from "./AdviceAppButtons";
import AdviceList from "./AdviceList";
import Background from "../Background";
import DashboardContainer from "../dashboards/DashboardContainer";
import DashboardContent from "../dashboards/DashboardContent";
import DashboardFooter from "../dashboards/DashboardFooter";
import DashboardFooterButtonContainer from
	"../dashboards/subcomponents/DashboardFooterButtonContainer";
import DashboardHeader from "../dashboards/DashboardHeader";
import GenericTitle from "../dashboards/subcomponents/GenericTitle";
import Sider from "../Sider";
import View from "../View";
import candyPinkBackgrund from "../../res/candy-pink-background.jpg";










const AdvicesApp = () => {
	const [{advice}, dispatch] = useStore();


	const advicePerRetailerAndCategory = {};

	const categories = Object.keys(advice);


	for (const category of categories) {
		let combinedData = [];
		const brands = Object.keys(advice[category]);
		for (const brand of brands) {
			const concepts = Object.keys(advice[category][brand]);
			for (const concept of concepts) {
				combinedData = [...combinedData, ...advice[category][brand][concept].data];
			}
		}
		const retailerMoveUp = combinedData.reduce((acc, val) => {
			const newObject = {
				EAN: val.ean,
				Productomschrijving: val.description,
				RSP: val.rsp,
				Adviesprijs: val.advice,
				Marge: val.margin,
			};
			if (Object.prototype.hasOwnProperty.call(acc, val.retailer)) {
				acc[val.retailer].push(newObject);
			} else {
				acc[val.retailer] = [newObject];
			}
			return acc;
		}, {});
		advicePerRetailerAndCategory[category] = retailerMoveUp;
	}
	console.log({advice, advicePerRetailerAndCategory});
	return (
		<Background image={candyPinkBackgrund}>
			<Sider title="Pricing Tool"/>
			<View>
				<DashboardContainer type="with-header-and-footer">
					<DashboardHeader>
						<GenericTitle>
							Adviezen
						</GenericTitle>
					</DashboardHeader>
					<DashboardContent>
						<AdviceList data={advicePerRetailerAndCategory}/>
					</DashboardContent>
					<DashboardFooter>
						<DashboardFooterButtonContainer>
							<AdviceAppButtons/>
						</DashboardFooterButtonContainer>
					</DashboardFooter>
				</DashboardContainer>
			</View>
		</Background>
	);
};

export default AdvicesApp;
