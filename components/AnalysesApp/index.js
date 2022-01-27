import React, {useReducer, useState} from "react";

import {
	deepEqual,
	downloadExcelFromAoo,
	excelDownloader
} from "../../util/functions";
import AnalysesAppButtons from "./AnalysesAppButtons";
import Background from "../Background";
import DashboardContainer from "../dashboards/DashboardContainer";
import DashboardContent from "../dashboards/DashboardContent";
import DashboardFooter from "../dashboards/DashboardFooter";
import DashboardFooterButtonContainer from
	"../dashboards/subcomponents/DashboardFooterButtonContainer";
import DashboardHeader from "../dashboards/DashboardHeader";
import GenericTitle from "../dashboards/subcomponents/GenericTitle";
import ReportTable from "./ReportTable";
import Selectors from "./Selectors";
import Sider from "../Sider";
import SkeletonRows from "../dashboards/subcomponents/Table/SkeletonRows";
import View from "../View";
import candyPinkBackgrund from "../../res/candy-pink-background.jpg";







const initialState = [];

function reducer(state, action) {
	switch (action.type) {
	case "add": {
		const newState = [...state];
		newState.push(action.value);
		return newState;
	}
	case "remove":{
		const newState = [...state];
		return newState.filter(e => !deepEqual(e, action.value));
	}
	default:
		throw new Error();
	}
}

const AnalysesApp = ({nicknameTree, retailers: ret}) => {
	const [concepts, dispatchForConcepts] = useReducer(reducer, initialState);
	const [retailers, dispatchForRetailers] = useReducer(reducer, initialState);
	const [date, setDate] = useState("");
	const updateDate = e => {
		setDate(e.target.value);
	};

	const [working, setWorking] = useState(false);
	const [report, setReport] = useState();

	const downloadReport = () => {
		downloadExcelFromAoo(report, "Margerapport-"+new Date().toLocaleString());
	};

	const calibrationDate = date + "-01";

	const createReport = async () => {
		try {
			const body = JSON.stringify({
				concepts,
				retailers,
				calibrationDate
			});

			const res = await fetch("/api/analyses/get-margin-potential-report", {
				method: "POST",
				body,
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			});
			const json = await res.json();
			if (!res.ok) {
				console.log({res});
			 }
			 return json;

		} catch (e) {
			console.log({e});
		}
	};

	const doReport = async () => {
		setWorking(true);
		const freshReport = await createReport();
		setReport(freshReport);
		setWorking(false);
	};

	const noReport = !working && !report;
	const reportDone = !working && report;

	const states = {noReport, reportDone, working};

	const clearReport = () => setReport();

	return (
		<Background image={candyPinkBackgrund}>
			<Sider title="RSP Monitor"/>
			<View>
				<DashboardContainer type="with-header-and-footer">
					<DashboardHeader>
						<GenericTitle>
							Margepotentie-rapport
						</GenericTitle>
					</DashboardHeader>
					<DashboardContent>
						{noReport && <Selectors nicknameTree={nicknameTree} retailers={ret} dispatchForConcepts={dispatchForConcepts} dispatchForRetailers={dispatchForRetailers} date={date} updateDate={updateDate}/>}
						{working && <SkeletonRows/>}
						{reportDone && <ReportTable report={report}/>}
					</DashboardContent>
					<DashboardFooter>
						<DashboardFooterButtonContainer>
							<AnalysesAppButtons doReport={doReport} states={states} clearReport={clearReport} downloadReport={downloadReport}/>
						</DashboardFooterButtonContainer>
					</DashboardFooter>
				</DashboardContainer>
			</View>
		</Background>
	);
};


export default AnalysesApp;
