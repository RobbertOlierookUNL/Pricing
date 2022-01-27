import React from "react";

const DashboardFooterButtonContainer = ({children, paddingless}) => {
	return (
		<div>
			{children}
			<style jsx>{`
        width: 100%;
        height: 100%;
        display: flex;
        padding: ${paddingless ? 0 : "0 15px"};
        justify-content: space-between;
        align-items: center;


      `}</style>
		</div>
	);
};


export default DashboardFooterButtonContainer;
