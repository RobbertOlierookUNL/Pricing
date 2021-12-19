import React from "react";

const HideSkuMenu = ({ean}) => {

	return (
		<div>Verberg {ean}
			<style jsx>{`
        padding: 10px;
        background-color: white;
      `}</style>
		</div>
	);
};


export default HideSkuMenu;
