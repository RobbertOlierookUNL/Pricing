import React from "react";
import Link from "next/link";
import * as c from "../../lib/colors";

const Button = ({type, onClick, color = "unilever_blue", variant = "colored", width = "auto", href, pushLeft, disabled, children}) => {
	return (
		<>
			{href ?
				<Link
					href={href}
					className={`btn ${variant} ${disabled ? "" : (variant === "text" ? "text-hover-pop" : "hover-pop")}`}
				>
					{children}
				</Link>
				:
				<button
					className={`btn ${variant} ${disabled ? "" : (variant === "text" ? "text-hover-pop" : "hover-pop")}`}
					type={type}
					onClick={onClick}
					disabled={disabled}
				>
					{children}
				</button>
			}
			<style jsx>{`
			.btn {
				padding: 7px;
				width: ${width === "fixed" ? "100px" : width};
				cursor: ${disabled ? "auto" : "pointer"};
				border: none;
				${ variant !== "text" ? "font-size: 1.1em" : ""};
				${ pushLeft ? "margin-left: 15px" : ""};
			}



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
				background-color: ${disabled ? "gray" : c[color]?.color || c[color]};
				color: ${c[color]?.text || "white"};
			}
		`}</style>
		</>
	);
};



export default Button;
