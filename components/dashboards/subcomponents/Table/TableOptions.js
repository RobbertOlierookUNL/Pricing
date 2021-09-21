import React, {useContext} from "react";
import { RetailerMode } from "../../../../pages/[category]/plan";
import {unilever_blue, ballet_pink} from "../../../../lib/colors";


const TableOptions = () => {
	const [retailerMode, setRetailerMode] = useContext(RetailerMode);
	const toggleRetailerMode = () => {
		setRetailerMode(!retailerMode);
	};
	return (
		<div className="option-container">
			<div className="option1" onClick={toggleRetailerMode}>
				{retailerMode ? "Meer retailers" : "Minder retailers"}

			</div>
			<style jsx>{`
				.option-container {
					position: sticky;
					left: 0;
					width: 250px;
					height: 32px;
					background-color: ${ballet_pink.color};
				}
				.option1 {
					position: relative;
					top: 8px;
					margin: 0 auto;
					width: 100px;
					text-align: center;
					padding: 0 7px;
					border-radius: 7px;
					background-color: ${unilever_blue.color};
					color: ${unilever_blue.text};
					cursor: pointer;
				}
	`}</style>
		</div>
	);
};



export default TableOptions;
