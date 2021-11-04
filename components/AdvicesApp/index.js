import React from "react";

import { clearAdvice } from "../../util/reducers";
import { useStore } from "../../lib/Store";
import AdviceAppButtons from "./AdviceAppButtons";
import AdviceList from "./AdviceList";
import Background from "../Background";
import CloseButton from "../Button/CloseButton";
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

	const clear = () => dispatch(clearAdvice());


	const advicePerRetailerAndCategory = {};

	const categories = Object.keys(advice);


	for (const category of categories) {
		const combinedData = [];
		const brands = Object.keys(advice[category]);
		for (const brand of brands) {
			const concepts = Object.keys(advice[category][brand]);
			for (const concept of concepts) {
				for (const entry of advice[category][brand][concept].data) {
					combinedData.push({...entry, concept, brand, category});
				}
				// combinedData = [...combinedData, ...advice[category][brand][concept].data];
			}
		}
		console.log({combinedData});
		const retailerMoveUp = combinedData.reduce((acc, val) => {
			const newObject = { ...val};
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
						<div className="close-button">
							<CloseButton onClick={clear}/>
						</div>
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
			<style jsx>{`
				.close-button {
					position: absolute;
					right: 0;
					top: 0;
					width: 3ch;
					line-height: 25px;
					text-align: center;
					color: white;
				}
			`}</style>
		</Background>
	);
};

export default AdvicesApp;
