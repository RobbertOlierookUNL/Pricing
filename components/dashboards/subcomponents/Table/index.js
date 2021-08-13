import React, {useState, useEffect} from "react";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";


const Table = ({data, loadingState, errorState}) => {

	const [capSelect, setCapSelect] = useState({capH: true, capL: true});
	const [retailerSelect, setRetailerSelect] = useState({});

	useEffect(() => {
		if (data?.headers) {
			const tempObj = {};
			for (const header of data.headers) {
				tempObj[header.retailer] = true;
			}
			setRetailerSelect(tempObj);
		}
	}, [data?.headers?.[0]?.retailer]);

	const retailerBatchSelect = (retailers, value) => {
		const retObj = {};
		for (const ret of retailers) {
			retObj[ret] = value;
		}
		setRetailerSelect({...retailerSelect, ...retObj});
	};

	const handleCapSelect = cap => () => {
		const map = {capH: "H", capL: "L"};
		const nextValue = !capSelect[cap];

		setCapSelect({...capSelect, [cap]: nextValue});
		if (data?.headers) {
			const capRetailers = [];
			for (const header of data.headers) {
				if (header.cap === map[cap]) {
					capRetailers.push(header.retailer);
				}
			}
			retailerBatchSelect(capRetailers, nextValue);
		}
	};



	const handleRetailerSelect = (retailer, nextValue = "undefined") => () => {
		const thisNextValue = nextValue === "undefined" ? !retailerSelect[retailer] : nextValue;
		setRetailerSelect({...retailerSelect, [retailer]: thisNextValue});
	};

	return (
		<div>
			<TableHeader data={data?.headers} doRetailerSelect={[retailerSelect, handleRetailerSelect]} doCapSelect={[capSelect, handleCapSelect]}/>
			{<TableBody data={data?.body} errorState={errorState} loadingState={loadingState} headerSelections={[retailerSelect, capSelect]}/>}
			<style jsx>{`
				font-size: 11px;
				background-color: white;
				width: fit-content;
			`}</style>
		</div>
	);
};


export default Table;
