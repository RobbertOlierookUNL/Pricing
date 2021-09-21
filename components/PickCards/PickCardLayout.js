import React from "react";

const Pick2x1Layout = ({children, type}) => {
	return (
		<div className={`absolute-center pick-grid pick-${type}`}>
			{children}
		</div>
	);
};

export default Pick2x1Layout;
