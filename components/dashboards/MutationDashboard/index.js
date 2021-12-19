import React, {useState} from "react";

import candyPinkBackground from "res/candy-pink-background.jpg";

import { typesOfInterval } from "../../../lib/config";
import { useMutations } from "../../../util/useSwr-hooks";
import Background from "../../Background";
import DashboardContainer from "../DashboardContainer";
import DashboardContent from "../DashboardContent";
import DashboardFooter from "../DashboardFooter";
import DashboardFooterButtonContainer from
	"../subcomponents/DashboardFooterButtonContainer";
import DashboardHeader from "../DashboardHeader";
import GenericTitle from "../subcomponents/GenericTitle";
import MutationDashboardButtons from "./MutationDashboardButtons";
import MutationTable from "./MutationTable";
import Sider from "../../Sider";
import View from "../../View";
import getDateStrings from "../../../util/api-functions/get-date-strings";
import useCategory from "../../../util/useCategory";
import useConfig from "../../../util/useConfig";



















const MutationDashboard = ({mutationsPerInterval}) => {
	const category = useCategory();
	const [retailerMode, setRetailerMode] = useConfig("retailerMode");
	const [intervalMode, setIntervalMode] = useConfig("intervalMode");
	const {mutations: swrMutations, mutationsIsLoading, mutationsReturnsError} = useMutations(category, intervalMode);
	const serverMutations = mutationsPerInterval[intervalMode];
	const mutations = mutationsIsLoading ? serverMutations : swrMutations;
	// TODO:
	// useMutationPrefetcher(intervalMode)
	const [specificRetailer, setSpecificRetailer] = React.useState(false);
	const all = retailerMode ? "all" : "prio";
	const localRetailerSelect = specificRetailer || all;
	console.log({serverMutations, swrMutations, mutationsIsLoading});
	console.log({localRetailerSelect, specificRetailer, all});




	const updateRetailerSelect = (e) => {
		console.log({e, value: e.target.value});
		if (e.target.value === "all") {
			setRetailerMode(true);
			if (specificRetailer) setSpecificRetailer(false);
		} else if (e.target.value === "prio") {
			setRetailerMode(false);
			if (specificRetailer) setSpecificRetailer(false);
		} else {
			setSpecificRetailer(e.target.value);
		}


	};

	const updateIntervalMode = (e) => {
		setIntervalMode(e.target.value);
	};

	const retailers = Array.isArray(mutations) && mutations.map(m => m.retailer);
	const uniqueRetailers = retailers && [...new Set(retailers)];




	return (
		<Background image={candyPinkBackground}>
			<Sider title="RSP Monitor"/>
			<View>
				<DashboardContainer type="with-header-and-footer">
					<DashboardHeader>
						<GenericTitle>
							Mutaties | <span className="clickable">
								<select className="selectBox" value={localRetailerSelect} onChange={updateRetailerSelect}>
									<option className="selectOption" value={"all"}>Alle Retailers</option>
									<option className="selectOption" value={"prio"}>Prio Retailers</option>
									{Array.isArray(uniqueRetailers) && uniqueRetailers.map(r => (
										<option className="selectOption" key={r} value={r}>{r}</option>
									))}
								</select>
							</span> | <span className="clickable">
								<select className="selectBox" value={intervalMode} onChange={updateIntervalMode}>
									{typesOfInterval.map(type => (
										<option className="selectOption" key={type.value} value={type.value}>{type.string}</option>
									))}
								</select>
							</span>
						</GenericTitle>
					</DashboardHeader>
					<DashboardContent>
						<MutationTable data={mutations} loadingState={false} errorState={false} specificRetailer={specificRetailer}/>
					</DashboardContent>
					<DashboardFooter>
						<DashboardFooterButtonContainer>
							<MutationDashboardButtons/>
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
