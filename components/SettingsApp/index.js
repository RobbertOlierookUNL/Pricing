import React from "react";
import SnackbarProvider from "react-simple-snackbar";

import Background from "../Background";
import DashboardContainer from "../dashboards/DashboardContainer";
import DashboardContent from "../dashboards/DashboardContent";
import DashboardFooter from "../dashboards/DashboardFooter";
import DashboardFooterButtonContainer from
	"../dashboards/subcomponents/DashboardFooterButtonContainer";
import DashboardHeader from "../dashboards/DashboardHeader";
import GenericTitle from "../dashboards/subcomponents/GenericTitle";
import Nicknames from "./Nicknames";
import Settings from "./Settings";
import SettingsSector from "./SettingsSector";
import Sider from "../Sider";
import View from "../View";
import candyPinkBackgrund from "../../res/candy-pink-background.jpg";


















const SettingsApp = ({categories,	brands,	conceptsByBrand}) => {

	return (
		<Background image={candyPinkBackgrund}>
			<Sider title="RSP Monitor"/>
			<View>
				<SnackbarProvider>
					<DashboardContainer type="with-header-and-footer">
						<DashboardHeader>
							<GenericTitle>
							Instellingen
							</GenericTitle>
						</DashboardHeader>
						<DashboardContent>
							<Settings>
								<SettingsSector title="Nicknames">
									<Nicknames serverCategories={categories} serverBrands={brands} conceptsByBrand={conceptsByBrand}/>
								</SettingsSector>
							</Settings>
						</DashboardContent>
						<DashboardFooter>
							<DashboardFooterButtonContainer>
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

export default SettingsApp;
