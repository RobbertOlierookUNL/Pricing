import React from "react";

const AMPickCardLayout = ({children}) => {
	return (
		<div>
			{children}
			<style jsx>{`
        display: grid;
        grid-template: 500px / 200px 200px;
        gap: 100px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      `}</style>
		</div>
	);
};

export default AMPickCardLayout;
