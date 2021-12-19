import React, { useContext } from "react";

// import { ActiveBrand, ActiveConcept } from "../../../../pages/[category]/plan";
import { useStore } from "../../../../lib/Store";
import SkeletonRows from "./SkeletonRows";
import TableRow from "./TableRow";
import useCategory from "../../../../util/useCategory";
// import useConfig from "../../../../util/useConfig";








const TableBody = ({data, loadingState, errorState, headerSelections, doSelectAll}) => {
	const [state] = useStore();
	const {advice} = state;
	const category = useCategory();
	const umfeld = category === "umfeld";

	const isAlreadyInAdvice = (ean, retailer) => {
		return !!advice?.[category]?.[ean]?.[retailer];
	};

	console.log({state});

	return (
		<div>
			{loadingState && <SkeletonRows/>}
			{(!loadingState && !errorState && Array.isArray(data)) && data.map((entry, idx) =>
				<TableRow
					entry={entry}
					headerSelections={headerSelections}
					even={(idx+2)%2 === 0}
					key={entry.EAN_CE}
					isAlreadyInAdvice={isAlreadyInAdvice}
					doSelectAll={doSelectAll}
					umfeld={umfeld}
				/>)}
		</div>
	);
};


export default TableBody;
