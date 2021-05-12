import React from "react";

const View = ({children}) => {
	return (
		<div className="view">
			{children}
			<style jsx>{`
        position: relative;
        width: calc(100% - 100px);
        left: 100px;
        height: 100%;
     `}</style>
		</div>
	);
};

export default View;
