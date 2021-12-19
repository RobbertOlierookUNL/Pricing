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
import SnackbarProvider from "react-simple-snackbar";












const AdvicesApp = () => {
	const [{advice}, dispatch] = useStore();

	const clear = () => dispatch(clearAdvice());


	const advicePerRetailerAndCategory = {};
	for (const category of Object.keys(advice)) {
		const retailerMoveUp = Object.values(advice[category]).reduce((acc, val) => {
			for (const retailer of Object.keys(val)) {
				if (Object.prototype.hasOwnProperty.call(acc, retailer)) {
					acc[retailer].push(val[retailer]);
				} else {
					acc[retailer] = [val[retailer]];
				}
			}
			return acc;
		}, {});
		advicePerRetailerAndCategory[category] = retailerMoveUp;
	}

	console.log({advice, advicePerRetailerAndCategory});

	return (
		<Background image={candyPinkBackgrund}>
			<Sider title="RSP Monitor"/>
			<View>
				<SnackbarProvider>
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
				</SnackbarProvider>
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
