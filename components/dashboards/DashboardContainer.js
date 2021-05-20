import React from "react";

const DashboardContainer = ({children, type}) => {
	return (
		<div className={`absolute-center shadow ${type ? type : ""}`}>
			{children}
			<style jsx>{`
        width: 90%;
        height: 90%;
        max-width: 1100px;
        max-height: 750px;

        .with-header-and-footer {
          display: grid;
          grid-template-rows: 60px auto 60px;
        }
    `}</style>
		</div>
	);
};

export default DashboardContainer;
