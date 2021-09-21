import React from "react";

const DashboardHeader = ({children}) => {
	return (
		<div className="unl-blue pos-rel">
			{children}
			<style jsx>{`
				/* position: sticky;
				top: 0;
				z-index: 3; */
			`}</style>
		</div>
	);
};

export default DashboardHeader;
