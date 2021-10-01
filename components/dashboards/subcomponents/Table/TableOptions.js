import React, {useContext} from "react";

import { RetailerMode } from "../../../../pages/[category]/plan";
import {unilever_blue, ballet_pink} from "../../../../lib/colors";
import TableOption from "./TableOption";
import useConfig from "../../../../util/useConfig";




const TableOptions = () => {
	const [retailerMode, setRetailerMode] = useConfig("retailerMode");
	const [adviceMode, setAdviceMode] = useConfig("adviceMode");

	const toggleRetailerMode = () => {
		setRetailerMode(!retailerMode);
	};

	const toggleAdviceMode = () => {
		(adviceMode === "opportune") ? setAdviceMode("CAP") : setAdviceMode("opportune");
	};
	return (
		<div className="option-container">
			<TableOption onClick={toggleRetailerMode}>
				{retailerMode ? "Meer retailers" : "Minder retailers"}
			</TableOption>
			<TableOption onClick={toggleAdviceMode}>
				{adviceMode === "opportune" ? "CAP advies" : "Logisch advies"}
			</TableOption>
			<TableOption onClick={toggleRetailerMode}>
				{retailerMode ? "Meer retailers" : "Minder retailers"}
			</TableOption>
			<TableOption onClick={toggleRetailerMode}>
				{retailerMode ? "Meer retailers" : "Minder retailers"}
			</TableOption>
			<style jsx>{`
				.option-container {
					position: sticky;
					left: 0;
					width: 250px;
					height: 32px;
					background-color: ${ballet_pink.color};
					display: grid;
					grid-template: 15px 15px / 124px 124px;
					padding: 1px;
				}
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



export default TableOptions;
