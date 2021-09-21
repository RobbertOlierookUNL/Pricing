import React from "react";
import PickCardTitle from "./PickCardTitle";
import PickCardTotalCases from "./PickCardTotalCases";
import PickCardAlertCases from "./PickCardAlertCases";




const PickCard = ({image, title, route, total, alert, type}) => {

	return (
		<div className={`pick-card shadow ${type ? `pick-card-${type}` : ""}`} onClick={route}>
			<PickCardTotalCases amount={total}/>
			<PickCardAlertCases amount={alert}/>
			<PickCardTitle>{title}</PickCardTitle>
			<style jsx>{`
          background: url(${image}) no-repeat center center;
      `}</style>
		</div>
	);
};


export default PickCard;
