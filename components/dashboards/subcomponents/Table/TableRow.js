import React, {useContext, useState, useEffect} from "react";

import {makeRetailSalesPrice, distanceMaker} from "util/functions";
import useRetailerSorter from "util/useRetailerSorter";

import { RetailerMode } from "../../../../pages/[category]/plan";
import InfoCard from "./InfoCard";
import PriceCard from "./PriceCard";
import useConfig from "../../../../util/useConfig";




const TableRow = ({entry, even, headerSelections, isAlreadyInAdvice, isInAdviceStore, doSelectAll}) => {
	const {prices, ...info} = entry;
	const [retailerMode] = useConfig("retailerMode");

	const {sortedData} = useRetailerSorter(prices, retailerMode);
	const [adviceMode] = useConfig("adviceMode");

	const [adviceHigh, setAdviceHigh] = useState(info?.defaultAdviceHigh || 0);
	const [adviceLow, setAdviceLow] = useState(info?.defaultAdviceLow || 0);

	const {value, done, execute} = doSelectAll;

	//// TODO: Make dynamic
	// const isAhListed = sortedData.some(e => e.retailer === "AH" && e.rsp > 0);
	// const isJumboListed = sortedData.some(e => e.retailer === "Jumbo L" && e.rsp > 0);
	// let defaultValue = (isAhListed && isJumboListed);
	let defaultValue = false;
	const [rowSelect, setRowSelect] = useState(defaultValue);


	// console.log({sortedData, isAhListed});

	useEffect(() => {
		if ((value !== "unset") && (done === false)) {
			execute();
			setRowSelect(value);
		}
	}, [done]);


	useEffect(() => {
		setAdviceHigh(info.defaultAdviceHigh);
		setAdviceLow(info.defaultAdviceLow);
	}, [info?.defaultAdviceLow, info?.defaultAdviceHigh]);

	useEffect(() => {
	  if (adviceMode === "opportune") {
	  	setAdviceHigh(info?.defaultAdviceHigh || 0);
			setAdviceLow(info?.defaultAdviceLow || 0);
	  }
		if (adviceMode === "CAP") {
			setAdviceHigh(info?.CAP_H || 0);
			setAdviceLow(info?.CAP_L || 0);
		}
	}, [adviceMode]);

	const handleHighChange = e => {
		setAdviceHigh(e.floatValue);
		setAdviceLow(false);
	};
	const handleLowChange = e => {
		setAdviceLow(e.floatValue);
	};
	const handleRowSelect = () => {
		console.log({rowSelect});
		setRowSelect(!rowSelect);
	};
	const distance = makeRetailSalesPrice(distanceMaker(adviceHigh));

	const currentLow = adviceLow || distance;

	return (
		<div>
			<InfoCard
				info={info}
				even={even}
				doRowSelect={[rowSelect, handleRowSelect]}
				handleHighChange={handleHighChange}
				handleLowChange={handleLowChange}
				adviceLow={currentLow}
				adviceHigh={adviceHigh}/>
			{sortedData.map(price => {
				const adviceStub = {ean: info.EAN_CE, description: info.Artikelomschrijving};
				return (
					<PriceCard
						key={price.retailer}
						adviceStub={adviceStub}
						price={price}
						advice={price.cap === "H" ? adviceHigh : currentLow}
						isAlreadyInAdvice={isAlreadyInAdvice}
						isInAdviceStore={isInAdviceStore}
						rowSelect={rowSelect}
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
