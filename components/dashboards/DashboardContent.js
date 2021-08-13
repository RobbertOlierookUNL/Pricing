import React from "react";
import {ballet_pink} from "../../lib/colors";

const DashboardContent = ({children}) => {
	return (
		<div>
			{children}
			<style jsx>{`
        background-color: ${ballet_pink.color};
				position: relative;
				height: calc(100% -90px);
				overflow: auto;
      `}</style>
		</div>
	);
};

export default DashboardContent;
