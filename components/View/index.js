import React from "react";

const View = ({children, rightSider=false}) => {
	return (
		<div className="view">
			{children}
			<style jsx>{`
        position: relative;
        width: calc(100% - ${rightSider ? "200px" : "100px"});
        left: 100px;
        height: 100%;
     `}</style>
		</div>
	);
};

export default View;
