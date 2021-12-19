import React, { useState, useEffect } from "react";

import useRetailerSorter from "util/useRetailerSorter";

import { collectConcept } from "../../../../util/reducers";
import { useStore } from "../../../../lib/Store";
import InfoCard from "./InfoCard";
import PriceCard from "./PriceCard";
import useAdvicePrices from "../../../../util/useAdvicePrices";
import useConfig from "../../../../util/useConfig";









const TableRow = ({entry, even, headerSelections, isAlreadyInAdvice, doSelectAll, umfeld}) => {
	const {prices, ...info} = entry;
	const [retailerMode] = useConfig("retailerMode");
	const [triggerSaveAdvicePrices] = useConfig("triggerSaveAdvicePrices");

	const {adviceHigh, handleHighChange, adviceLow, handleLowChange, saveAdvicePrices} = useAdvicePrices(info);
	const {sortedData} = useRetailerSorter(prices, retailerMode);

	const [localStates, setLocalStates] = useState(Array(sortedData.length).fill(false));
	const getLocalState = idx => {
		const localState = localStates[idx];
		const setLocalState = value => {
			const copy = [...localStates];
			copy[idx] = value;
			setLocalStates(copy);
		};
		return [localState, setLocalState];
	};
	const noneSelected = localStates.reduce((acc, val) => !(acc || val));
	const [{grabAdvice}, adviceDispatch] = useStore();

	useEffect(() => {
		if (triggerSaveAdvicePrices) {
			saveAdvicePrices();
		}
	}, [triggerSaveAdvicePrices]);

	useEffect(() => {
		if (grabAdvice && noneSelected) {
			adviceDispatch(collectConcept({ean: info.EAN_CE}));
		}
	}, [grabAdvice]);
	const {value, done, execute} = doSelectAll;


	let defaultValue = false;
	const [rowSelect, setRowSelect] = useState(defaultValue);

	useEffect(() => {
		if ((value !== "unset") && (done === false)) {
			execute();
			setRowSelect(value);
			setLocalStates(Array(sortedData.length).fill(value));
		}
	}, [done]);


	const handleRowSelect = () => {
		setRowSelect(!rowSelect);
		setLocalStates(Array(sortedData.length).fill(!rowSelect));
	};

	return (
		<div>
			<InfoCard
				info={info}
				even={even}
				doRowSelect={[rowSelect, handleRowSelect]}
				handleHighChange={handleHighChange}
				handleLowChange={handleLowChange}
				adviceLow={adviceLow}
				adviceHigh={adviceHigh}
				umfeld={umfeld}
			/>
			{sortedData.map((price, idx) => {
				const adviceStub = {ean: info.EAN_CE, description: info.Artikelomschrijving, nasa: info.NASA};
				return (
					<PriceCard
						key={price.retailer}
						getLocalState={getLocalState(idx)}
						adviceStub={adviceStub}
						price={price}
						advice={price.adviceCap === "H" ? adviceHigh : adviceLow}
						isAlreadyInAdvice={isAlreadyInAdvice}
						umfeld={umfeld}
						headerSelections={headerSelections}/>


				);
			})}
			<style jsx>{`
        width: 100%;
		    display: inline-grid;
				height: 46px;
		    grid-template-columns: 250px repeat(${sortedData.length}, minmax(58px, 1fr));

				:nth-child(even) {
					background-color: rgba(200, 200, 200, 0.3);
				}

				:last-child {
					border: 1px solid #fff;
					border-width: 0 0 1px 0;
				}
}
			`}</style>
		</div>
	);
};


export default TableRow;
