import NumberFormat from "react-number-format";
import React, { useState, useEffect } from "react";

import {ballet_pink, bottle_green, sunset_red, unilever_blue, denim_blue, orchid_purple} from "../../../../lib/colors";
import { collectConcept } from "../../../../util/reducers";
import { useStore } from "../../../../lib/Store";
import EuroFormat from "../../../EuroFormat";
import advices from "../../../../pages/advices";








const PriceCard = ({price, advice, adviceStub, rowSelect, headerSelections, isAlreadyInAdvice, isInAdviceStore}) => {
	const [{grabAdvice, advice: advices}, adviceDispatch] = useStore();
	const [retailerSelect, capSelect] = headerSelections;

	const inAdvice = isInAdviceStore && isAlreadyInAdvice(adviceStub.ean, price.retailer);
	const adviceButNotInAdvice = isInAdviceStore && !isAlreadyInAdvice(adviceStub.ean, price.retailer);


	const couldBeAdviced = price.rsp && (price.rsp < advice);

	const [localState, setLocalState] = useState(!adviceButNotInAdvice && couldBeAdviced);

	const columnSelect = retailerSelect[price.retailer];
	const selectedForAdvice = couldBeAdviced && localState;

	useEffect(() => {
		if (grabAdvice && selectedForAdvice) {
			const {rsp, volume, retailer} = price;
			const difference = advice - rsp;
			const margin = difference * volume;
			const adviceEntry = {...adviceStub, rsp, margin, retailer, advice};
			adviceDispatch(collectConcept(adviceEntry));
		}
	}, [grabAdvice]);

	useEffect(() => {
	  setLocalState(rowSelect);
	}, [rowSelect]);

	useEffect(() => {
		setLocalState(columnSelect);
	}, [columnSelect]);



	// useEffect(() => {
	// 	setLocalState(gridSelect);
	// }, [gridSelect]);

	const handleLocalChange = () => {
		couldBeAdviced && setLocalState(!localState);
	};

	return (
		<div className={`price-card ${couldBeAdviced ? "clickable" : ""}`} onClick={handleLocalChange}>
			{(price.rsp || price.volume) ?
				<>
					<div className="price"><EuroFormat value={price.rsp}/></div>
					{price.delta ? <div className="delta"><NumberFormat value={price.delta} displayType="text" decimalSeparator="," thousandSeparator="."/></div> : <></>}
					<div className="price-card-volume"><NumberFormat value={price.volume} displayType="text" decimalSeparator="," thousandSeparator="."/></div>
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
						${(!price.rsp && !price.volume) ? `background-color: ${ballet_pink.color} !important;` : !price.rsp ? "background-color: #bbb !important;": ""}
						${selectedForAdvice ? `background-color: ${denim_blue.color} !important` : ""};
						${selectedForAdvice && inAdvice ? `background-color: ${orchid_purple.color} !important` : ""};

						${selectedForAdvice ? `color: ${denim_blue.text}` : ""};


						display: grid;
						grid-template: "price delta" 13px
					                 ". ." 13px
					                 "volume volume" 13px
					                 / 1fr min-content;
					}
					.price-card:nth-child(odd) {
						background-color: rgba(31, 54, 199, 0.05);
					}
					.price {
						grid-area: price;
						color: ${(couldBeAdviced && !selectedForAdvice) ? unilever_blue.color : "inherit"};
						font-weight: ${couldBeAdviced ? "bold" : "inherit"};



					}
					.delta {
						grid-area: delta;
						font-size: 0.8em;
						color: white;
						text-align: center;
						border-bottom-left-radius: 7px;
						padding: 0 3px;


						${price.delta ? `background-color: ${price.delta < 0 ? sunset_red.color :  bottle_green.color} !important` : ""};

					}

					.price-card-volume {
						color: ${selectedForAdvice ? "#ddd" : "#666"};
						font-size: 0.8em;
						grid-area: volume;
					}
				`}
			</style>
		</div>
	);
};



export default PriceCard;
