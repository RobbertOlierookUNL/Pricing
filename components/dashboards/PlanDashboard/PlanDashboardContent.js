import React from "react";
import Table from "../subcomponents/Table";



const PlanDashboardContent = ({data, errorState, loadingState, doSelectAll}) => {
	return (
		<Table data={data} errorState={errorState} loadingState={loadingState} doSelectAll={doSelectAll}/>
	);
};



export default PlanDashboardContent;
