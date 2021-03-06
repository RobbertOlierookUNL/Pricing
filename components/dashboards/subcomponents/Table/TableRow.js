import React, { useState, useEffect } from "react";

import useRetailerSorter from "util/useRetailerSorter";

import InfoCard from "./InfoCard";
import PriceCard from "./PriceCard";
import useAdvicePrices from "../../../../util/useAdvicePrices";
import useConfig from "../../../../util/useConfig";







const TableRow = ({entry, even, headerSelections, isAlreadyInAdvice, doSelectAll}) => {
	const {prices, ...info} = entry;
	const [retailerMode] = useConfig("retailerMode");
	const {adviceHigh, handleHighChange, adviceLow, handleLowChange} = useAdvicePrices(info);
	const {sortedData} = useRetailerSorter(prices, retailerMode);

	const {value, done, execute} = doSelectAll;

	//// TODO: Make dynamic
	// const isAhListed = sortedData.some(e => e.retailer === "AH" && e.rsp > 0);
	// const isJumboListed = sortedData.some(e => e.retailer === "Jumbo L" && e.rsp > 0);
	// let defaultValue = (isAhListed && isJumboListed);
	let defaultValue = false;
	const [rowSelect, setRowSelect] = useState(defaultValue);

	useEffect(() => {
		if ((value !== "unset") && (done === false)) {
			execute();
			setRowSelect(value);
		}
	}, [done]);


	const handleRowSelect = () => {
		setRowSelect(!rowSelect);
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
				adviceHigh={adviceHigh}/>
			{sortedData.map(price => {
				const adviceStub = {ean: info.EAN_CE, description: info.Artikelomschrijving, nasa: info.NASA};
				return (
					<PriceCard
						key={price.retailer}
						adviceStub={adviceStub}
						price={price}
						advice={price.cap === "H" ? adviceHigh : adviceLow}
						isAlreadyInAdvice={isAlreadyInAdvice}
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
