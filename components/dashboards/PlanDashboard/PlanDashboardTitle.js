import React, { useContext } from "react";
import { ActiveConcept } from "../PlanDashboard";


const PlanDashboardTitle = () => {
	const [activeConcept] = useContext(ActiveConcept);

	return (
		<div className="header-title">
      Gepland - {activeConcept}
		</div>
	);
};



export default PlanDashboardTitle;
