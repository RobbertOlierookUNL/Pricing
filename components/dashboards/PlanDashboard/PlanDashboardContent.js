import React from "react";
import Table from "../subcomponents/Table";

const fakedata = new Array(25).fill(".");


const PlanDashboardContent = () => {
	return (
		<Table headers="retailers" twoCap data={fakedata}/>
	);
};



export default PlanDashboardContent;
