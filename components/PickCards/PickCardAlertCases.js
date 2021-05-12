import React from "react";

const PickCardAlertCases = ({amount}) => {
	return (
		<>
			{amount && <div className="number-circle number-circle-alert">{amount}</div>}
		</>
	);
};


export default PickCardAlertCases;
