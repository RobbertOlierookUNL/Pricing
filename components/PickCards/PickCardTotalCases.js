import React from "react";

const PickCardTotalCases = ({amount}) => {
	return (
		<>
			{amount && <div className="number-circle number-circle-total">{amount}</div>}
		</>
	);
};


export default PickCardTotalCases;
