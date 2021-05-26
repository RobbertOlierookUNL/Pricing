import React from "react";

const Grower = ({grow}) => {
	return (
		<div>
			<style jsx>{`
        flex-grow: ${grow};
      `}</style>
		</div>
	);
};

export default Grower;
