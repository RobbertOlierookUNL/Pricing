import React from "react";
import Table from "../subcomponents/Table";

const fakedata = new Array(25).fill(".");


const PlanDashboardContent = ({data, errorState, loadingState}) => {
	return (
		<Table data={data} errorState={errorState} loadingState={loadingState}/>
	);
};



export default PlanDashboardContent;
