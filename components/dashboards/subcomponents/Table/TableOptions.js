import React, {useContext} from "react";

import { RetailerMode } from "../../../../pages/[category]/plan";
import { sendMail } from "../../../../util/functions";
import {
	typesOfAdvice,
	typesOfInfo,
	typesOfInterval
} from "../../../../lib/config";
import {unilever_blue, ballet_pink} from "../../../../lib/colors";
import TableOption from "./TableOption";
import useConfig from "../../../../util/useConfig";








const TableOptions = () => {
	const [retailerMode, setRetailerMode] = useConfig("retailerMode");
	const [deltaMode, setDeltaMode] = useConfig("deltaMode");
	const [adviceMode, setAdviceMode] = useConfig("adviceMode");
	const [intervalMode, setIntervalMode] = useConfig("intervalMode");
	const [infoMode, setInfoMode] = useConfig("infoMode");



	const toggleRetailerMode = () => {
		setRetailerMode(!retailerMode);
	};

	const toggleDeltaMode = () => {
		setDeltaMode(!deltaMode);
	};

	const updateAdviceMode = (e) => {
		setAdviceMode(e.target.value);
	};
	const updateIntervalMode = (e) => {
		setIntervalMode(e.target.value);
	};
	const updateInfoMode = (e) => {
		setInfoMode(e.target.value);
	};


	return (
		<div className="option-container">
			<TableOption onClick={toggleRetailerMode}>
				{retailerMode ? "Prio" : "Alle"}
			</TableOption>
			<TableOption onClick={toggleDeltaMode}>
				{deltaMode ? "%" : "€"}
			</TableOption>
			<TableOption>
				<select className="selectBox" value={adviceMode} onChange={updateAdviceMode}>
					{typesOfAdvice.map(type => (
						<option className="selectOption" key={type.value} value={type.value}>{type.string}</option>
					))}
				</select>
			</TableOption>
			<TableOption span={"span 2"}>
				<select className="selectBox" value={intervalMode} onChange={updateIntervalMode}>
					{typesOfInterval.map(type => (
						<option className="selectOption" key={type.value} value={type.value}>{type.string}</option>
					))}
				</select>
			</TableOption>
			<TableOption>
				<select className="selectBox" value={infoMode} onChange={updateInfoMode}>
					{typesOfInfo.map(type => (
						<option className="selectOption" key={type.value} value={type.value}>{type.string}</option>
					))}
				</select>
			</TableOption>
			<style jsx>{`
				.option-container {
					position: sticky;
					left: 0;
					width: 250px;
					height: 32px;
					background-color: ${ballet_pink.color};
					display: grid;
					grid-template: 15px 15px / 62px 62px 124px;
					padding: 1px;
				}

				.selectBox {
					appearance: none;
					background: none;
					font: inherit;
					border: none;
					color: inherit;
					text-align: center;
					padding: 0 10px;
				}
				.selectBox:focus{
		      outline: none;
		    }
				.selectOption{
					color: black;
				}
	`}</style>
		</div>
	);
};



export default TableOptions;
