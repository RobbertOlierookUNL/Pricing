import React from "react";

import ConceptSelector from "./ConceptSelector";
import DateSelector from "./DateSelector";
import RetailerSelector from "./RetailerSelector";



const Selectors = ({nicknameTree, retailers, dispatchForConcepts, dispatchForRetailers, date, updateDate}) => {
	return (
		<div>
			<DateSelector title="IJkdatum" value={date} update={updateDate}/>
			<ConceptSelector dispatch={dispatchForConcepts} title="Kies concepten" nicknameTree={nicknameTree}/>
			<RetailerSelector dispatch={dispatchForRetailers} title="Kies retailers" retailers={retailers}/>
		</div>
	);
};

export default Selectors;
