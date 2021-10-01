import React from "react";

import { unilever_blue } from "../../../../lib/colors";




const TableOption = ({onClick, children}) => {
	return (
		<div className="option">
			<div onClick={onClick}>
				{children}
			</div>
			<style jsx>{`

				.option {
					padding: 1px;
				}
				.option > div {
					/* position: relative; */
					/* top: 8px; */
					margin: 0 auto;
					width: 100%;
					height: 13px;
					line-height: 13px;
					text-align: center;
					/* padding: 0 7px; */
					border-radius: 7px;
					background-color: ${unilever_blue.color};
					color: ${unilever_blue.text};
					cursor: pointer;
					transition: background-color 500ms, color 500ms;
				}

				.option > div:hover {
					background-color: ${unilever_blue.text};
					color: ${unilever_blue.color};
				}
	`}</style>
		</div>
	);
};



export default TableOption;
