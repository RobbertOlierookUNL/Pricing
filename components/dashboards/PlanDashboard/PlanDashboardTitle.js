import React from "react";

import Grower from "../subcomponents/Grower";
import useCategory from "../../../util/useCategory";
import useConfig from "../../../util/useConfig";




const PlanDashboardTitle = () => {
	const category = useCategory();
	const [activeBrand] = useConfig("lastActiveBrand");
	const [activeConcept] = useConfig("lastActiveConcept");

	const brand = activeBrand?.[category];
	const concept = activeConcept?.[category]?.[brand];

	return (
		<div className="header-title">
			{concept}
		</div>
	);
};



export default PlanDashboardTitle;
