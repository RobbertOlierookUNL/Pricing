import React from "react";

import useCategory from "../../../util/useCategory";
import useConfig from "../../../util/useConfig";



const PlanDashboardTitle = () => {
	const category = useCategory();
	const [activeBrand, setActiveBrand] = useConfig("lastActiveBrand-"+category);
	const [activeConcept, setActiveConcept] = useConfig("lastActiveConcept-"+category+activeBrand);
	return (
		<div className="header-title">
			{activeConcept}
		</div>
	);
};



export default PlanDashboardTitle;
