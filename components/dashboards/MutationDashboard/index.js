import React, {useState} from "react";

import candyPinkBackground from "res/candy-pink-background.jpg";

import { useMutations } from "../../../util/useSwr-hooks";
import Background from "../../Background";
import DashboardContainer from "../DashboardContainer";
import DashboardContent from "../DashboardContent";
import DashboardFooter from "../DashboardFooter";
import DashboardFooterButtonContainer from
	"../subcomponents/DashboardFooterButtonContainer";
import DashboardHeader from "../DashboardHeader";
import GenericTitle from "../subcomponents/GenericTitle";
import MutationTable from "./MutationTable";
import Sider from "../../Sider";
import View from "../../View";
import getDateStrings from "../../../util/api-functions/get-date-strings";
import useCategory from "../../../util/useCategory";
















const MutationDashboard = () => {
	const {todayString, ...intervalDates} = getDateStrings();
	const dates = Object.keys(intervalDates);
	const category = useCategory();
	const defaultInterval = "lastWeekString";
	const [interval, setInterval] = useState(defaultInterval);
	const {mutations, mutationsIsLoading, mutationsReturnsError} = useMutations(category, interval);

	console.log({mutations});







	return (
		<Background image={candyPinkBackground}>
			<Sider title="RSP Monitor"/>
			<View>
				<DashboardContainer type="with-header-and-footer">
					<DashboardHeader>
						<GenericTitle>
							Mutaties
						</GenericTitle>
					</DashboardHeader>
					<DashboardContent>
						<MutationTable data={mutations} loadingState={mutationsIsLoading} errorState={mutationsReturnsError}/>
					</DashboardContent>
					<DashboardFooter>
						<DashboardFooterButtonContainer>

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

export default MutationDashboard;
