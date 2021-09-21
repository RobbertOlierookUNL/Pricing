import React from "react";

const DashboardFooter = ({children}) => {
	return (
		<div>
			{children}
			<style jsx>{`
        background-color: #ddd;
      `}</style>
		</div>
	);
};

export default DashboardFooter;
