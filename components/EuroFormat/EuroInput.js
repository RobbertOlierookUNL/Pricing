import React from "react";

const EuroInput = ({height, ...props}) => {

	return (
		<>
			<input {...props} className="euro-input"/>
			<style jsx>{`
        .euro-input {
          color: inherit;
          font: inherit;
          border:none;
          border-radius: 1px;
          background-image:none;
          background-color: rgba(255,255,255,0.25);
          appearance: none;
          width: 100%;
          ${height ? "height: "+height:""};
          transition: transform 150ms linear, box-shadow 150ms linear;
        }
        .euro-input:hover {
          transform: scale(1.1);
        }
        .euro-input:focus {
          outline: none;
          transform: scale(1.3);
        }
    `}</style>
		</>
	);
};


export default EuroInput;
