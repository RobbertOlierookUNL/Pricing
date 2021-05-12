import React from "react";

const UnileverLogo = () => {
	return (
		<>
			<img src={require("../../res/logo.png")} alt="logo"/>
			<style jsx>{`
        img {
          width: 100px;
          position: absolute;
          bottom: 20px;
        }
    `}</style>
		</>
	);
};

export default UnileverLogo;
