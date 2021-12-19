import NumberFormat from "react-number-format";
import React, { useState, useEffect } from "react";

import {ballet_pink, bottle_green, sunset_red, unilever_blue, denim_blue, orchid_purple} from "../../../../lib/colors";
import { collectConcept } from "../../../../util/reducers";
import { setDecimals } from "../../../../util/functions";
import { useStore } from "../../../../lib/Store";
import EuroFormat from "../../../EuroFormat";
import advices from "../../../../pages/advices";
import useCategory from "../../../../util/useCategory";
import useConfig from "../../../../util/useConfig";
import usePriceInfo from "../../../../util/usePriceInfo";












const PriceCard = ({price, getLocalState, advice, adviceStub, headerSelections, isAlreadyInAdvice, umfeld}) => {
	const [intervalMode] = useConfig("intervalMode");
	const [deltaMode] = useConfig("deltaMode");
	const PriceInfo = usePriceInfo();



	const [{grabAdvice}, adviceDispatch] = useStore();
	const [retailerSelect] = headerSelections;

	const thisIsAlreadyInAdvice = isAlreadyInAdvice(adviceStub.ean, price.retailer);

	const inAdvice = thisIsAlreadyInAdvice;


	const couldBeAdviced = price.rsp && (price.rsp < advice) && price.volume && !umfeld;

	const [localState, setLocalState] = getLocalState;

	const columnSelect = retailerSelect[price.retailer];
	const selectedForAdvice = couldBeAdviced && localState;
	const adviceButNotInAdvice = thisIsAlreadyInAdvice && !selectedForAdvice;



	let delta = price.rsp - price[intervalMode];

	if (deltaMode) {
		delta = Math.round((delta / price.rsp) * 100);
	} else if (price.rsp) {
		delta = setDecimals(delta, 2);

	}


	useEffect(() => {
		if (grabAdvice && selectedForAdvice) {
			const {rsp, volume, retailer, formalTitle, email, sdEmail, first_name, sdFirstName, last_name, sdLastName} = price;
			const adviceEntry = {...adviceStub, rsp, retailer, advice, volume, formalTitle, email, sdEmail, first_name, sdFirstName, last_name, sdLastName};
			adviceDispatch(collectConcept(adviceEntry));
		}
	}, [grabAdvice]);


	useEffect(() => {
		setLocalState(columnSelect);
	}, [columnSelect]);

	useEffect(() => {
		if (thisIsAlreadyInAdvice) {
			setLocalState(true);
		}
	}, [thisIsAlreadyInAdvice]);


	const handleLocalChange = () => {
		couldBeAdviced && setLocalState(!localState);
	};

	return (
		<div className={`price-card ${couldBeAdviced ? "clickable" : ""}`} onClick={handleLocalChange}>
			{(price.rsp || price.volume) ?
				<>
					<div className="price"><EuroFormat value={price.rsp}/></div>
					{delta ? <div className="delta"><NumberFormat value={delta} displayType="text" decimalSeparator="," thousandSeparator="." suffix={deltaMode && "%"}/></div> : <></>}
					<div className="info"><PriceInfo price={price} advice={advice} selectedForAdvice={selectedForAdvice}/></div>
				</>
				:
				<></>
			}
			<style jsx>{`
					.price-card {
						text-overflow: clip;
				    white-space: nowrap;
				    overflow: hidden;
						width: 100%;
						height: 100%;
						${(!price.rsp && !price.volume) ? `background-color: ${ballet_pink.color} !important;` : ((!price.rsp || !price.volume) && !umfeld) ? "background-color: #bbb !important;": ""}
						${selectedForAdvice ? `background-color: ${denim_blue.color} !important` : ""};
						${selectedForAdvice && inAdvice ? `background-color: ${orchid_purple.color} !important` : ""};

						${selectedForAdvice ? `color: ${denim_blue.text}` : ""};


						display: grid;
						grid-template: "price delta" 13px
					                 "price ." 13px
					                 "info info" 13px
					                 / 1fr min-content;
					}
					.price-card:nth-child(odd) {
						background-color: rgba(31, 54, 199, 0.05);
					}
					.price {
						grid-area: price;
						${(couldBeAdviced && !selectedForAdvice) ? `color: ${unilever_blue.color}` : ""};
						${adviceButNotInAdvice ? `color: ${orchid_purple.color}` : ""};
						margin: 0 auto;
						font-size: 1.2em;
						padding: 5px 0;
						line-height: 16px;
						font-weight: ${couldBeAdviced ? "bold" : "inherit"};



					}
					.delta {
						grid-area: delta;
						font-size: 0.8em;
						color: white;
						text-align: center;
						border-bottom-left-radius: 7px;
						padding: 0 3px;


						${delta ? `background-color: ${delta < 0 ? sunset_red.color :  bottle_green.color} !important` : ""};

					}

					.info {
						color: ${selectedForAdvice ? "#ddd" : "#666"};
						font-size: 0.8em;
						grid-area: info;
						line-height: 13px;
						margin: auto;
					}
				`}
			</style>
		</div>
	);
};



export default PriceCard;
