import React, { useContext } from "react";

// import { ActiveBrand, ActiveConcept } from "../../../../pages/[category]/plan";
import { useStore } from "../../../../lib/Store";
import SkeletonRows from "./SkeletonRows";
import TableRow from "./TableRow";
import useCategory from "../../../../util/useCategory";
import useConfig from "../../../../util/useConfig";








const TableBody = ({data, loadingState, errorState, headerSelections, doSelectAll}) => {
	const [state] = useStore();
	const {advice} = state;
	const category = useCategory();
	const [activeBrand, setActiveBrand] = useConfig("lastActiveBrand-"+category);
	const [activeConcept, setActiveConcept] = useConfig("lastActiveConcept-"+category+activeBrand);


	// const [activeConcept] = useContext(ActiveConcept);
	// const [activeBrand] = useContext(ActiveBrand);
	const isInAdviceStore = !!advice?.[category]?.[activeBrand]?.[activeConcept]?.data[0];
	const getAdviceData = () => {
		if (isInAdviceStore) {
			return advice[category][activeBrand][activeConcept].data;
		}
		return false;
	};
	const adviceData = getAdviceData();

	const isAlreadyInAdvice = (ean, retailer) => {
		return adviceData?.some(entry => {
			if (entry.ean === ean && entry.retailer === retailer) {
				return true;
			}
			return false;
		});
	};



	console.log({state});
	console.log({isInAdviceStore});



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
					isInAdviceStore={isInAdviceStore}
					doSelectAll={doSelectAll}
				/>)}
		</div>
	);
};


export default TableBody;
