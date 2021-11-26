import React from "react";

const CloseButton = ({onClick}) => {
	return (
		<div onClick={onClick} className="text-hover-pop">
      ╳
		</div>
	);
};


export default CloseButton;
