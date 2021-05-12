import React from "react";

const Background= ({children, image}) => {
	return (
		<div className="background-cover">
			{children}
			<style jsx>{`
        background: url(${image}) no-repeat fixed center center;
      `}</style>
		</div>
	);
};

export default Background;
