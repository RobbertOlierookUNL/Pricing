import React from "react";
import PropTypes from "prop-types";
import * as c from "../../lib/colors";

const Button = ({type, onClick, color = "unilever_blue", variant = "colored", width = "auto", pushLeft, children}) => {
	console.log({c});
	return (
		<button
			className={`${variant} ${variant === "text" ? "text-hover-pop" : "hover-pop"}`}
			type={type}
			onClick={onClick}
		>
			{children}
			<style jsx>{`
        padding: 7px;
        width: ${width === "fixed" ? "100px" : width};
        cursor: pointer;
        border: none;
        ${ variant !== "text" ? "font-size: 1.1em" : ""};
        ${ pushLeft ? "margin-left: 15px" : ""};



        .hollow {
          background-color: ${c[color]?.text || "white"};
          color: ${c[color]?.color || c[color]};
          border: 2px solid ${c[color]?.color || c[color]};
          box-sizing: border-box;
        }
        .text {
          background: none;
          color: ${c[color]?.color || c[color]};
          text-decoration: underline;

        }
        .colored {
          background-color: ${c[color]?.color || c[color]};
          color: ${c[color]?.text || "white"};
        }
      `}</style>
		</button>
	);
};



export default Button;
