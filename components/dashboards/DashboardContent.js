import React from "react";

const DashboardContent = ({children}) => {
	return (
		<div>
			{children}
			<style jsx>{`
        background-color: #fff;
      `}</style>
		</div>
	);
};

export default DashboardContent;
