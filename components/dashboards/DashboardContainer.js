import React from "react";

const DashboardContainer = ({children, type}) => {
	return (
		<div className={`absolute-center shadow ${type ? type : ""}`}>
			{children}
			<style jsx>{`
        width: calc(100% - 28px);
        height: calc(100% - 28px);
        max-width: 2500px;
        max-height: 2000px;

        .with-header-and-footer {
          display: grid;
          grid-template-rows: 60px auto 60px;
        }
    `}</style>
		</div>
	);
};

export default DashboardContainer;
