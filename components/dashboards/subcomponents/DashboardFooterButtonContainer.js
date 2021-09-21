import React from "react";

const DashboardFooterButtonContainer = ({children}) => {
	return (
		<div>
			{children}
			<style jsx>{`
        width: 100%;
        height: 100%;
        display: flex;
        padding: 0 15px;
        justify-content: space-between;
        align-items: center;


      `}</style>
		</div>
	);
};


export default DashboardFooterButtonContainer;
