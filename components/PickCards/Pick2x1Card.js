import React from "react";
import PickCardTitle from "./PickCardTitle";


const RollPickCard = ({image, title, route}) => {

	return (
		<div className="pick-card pick-2x1-card" onClick={route}>
			<PickCardTitle>{title}</PickCardTitle>
			<style jsx>{`
          background: url(${image}) no-repeat center center;
      `}</style>
		</div>
	);
};


export default RollPickCard;
