import React, {useContext, useState, useEffect} from "react";

import InfoCard from "./InfoCard";
import PriceCard from "./PriceCard";
import useRetailerSorter from "util/useRetailerSorter";
import { RetailerMode } from "../../../../pages/[category]/plan";
import {makeRetailSalesPrice, distanceMaker} from "util/functions";



const TableRow = ({entry, even, headerSelections}) => {
	const {prices, ...info} = entry;
	const [retailerMode] = useContext(RetailerMode);
	const {sortedData} = useRetailerSorter(prices, retailerMode);
	const [adviceHigh, setAdviceHigh] = useState(info?.defaultAdviceHigh || 0);
	const [adviceLow, setAdviceLow] = useState(info?.defaultAdviceLow || 0);
	const [rowSelect, setRowSelect] = useState(true);



	useEffect(() => {
		setAdviceHigh(info.defaultAdviceHigh);
		setAdviceLow(info.defaultAdviceLow);
	}, [info?.defaultAdviceLow, info?.defaultAdviceHigh]);

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
						retailer={price.retailer}
						price={price}
						advice={price.cap === "H" ? adviceHigh : currentLow}
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
