import React, {useState, useEffect} from "react";

import RetailerSeed from "./RetailerSeed";


const PrioritySeed = ({retailers, width, dispatch, prio}) => {
	const [prioSelected, setPrioSelected] = useState(true);
	const thisRetailers = prio ? retailers.filter(e => e.priority != 0) :retailers.filter(e => e.priority == 0);

	const toggle = () => {
		setPrioSelected(!prioSelected);
	};
	return (
		<>
			<div onClick={toggle} className={`prio concept-selector-card ${prioSelected ? "concept-selector-card-selected" : ""}`}>
				<div className="absolute-center">
					{prio ? "Prio" : "Overig"}
				</div>
			</div>
			{thisRetailers.map(e => (
				<RetailerSeed retailerTitle={e.formalTitle} retailer={e.retailer} key={e.retailer} prioSelected={prioSelected} dispatch={dispatch}/>
			))}

			<style jsx>{`
        .prio {
          grid-row-end: span ${width};

        }
      `}</style>
		</>
	);
};


export default PrioritySeed;
