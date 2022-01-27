import React, {useState, useEffect} from "react";

const RetailerSeed = ({retailer, retailerTitle, dispatch, prioSelected}) => {
	const [localState, setLocalState] = useState(true);
	useEffect(() => {
		if (localState) {
			dispatch({type: "add", value: retailer});
		} else {
			dispatch({type: "remove", value: retailer});
		}
	}, [localState]);
	useEffect(() => {
	  setLocalState(prioSelected);
	}, [prioSelected]);
	const toggle = () => {
		setLocalState(!localState);
	};
	return (
		<>
			<div onClick={toggle} className={`nickname concept-selector-card ${localState ? "concept-selector-card-selected" : ""}`}  >
				{retailer}
			</div>

			<style jsx>{`
        .nickname {
        }
      `}</style>
		</>
	);
};


export default RetailerSeed;
