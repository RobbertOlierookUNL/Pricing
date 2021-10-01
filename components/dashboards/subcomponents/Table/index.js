import React, {useState, useEffect, useContext} from "react";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";


const Table = ({data, loadingState, errorState, doSelectAll}) => {
	const defaultCapSelect = {capH: false, capL: false, capO: false};
	const [capSelect, setCapSelect] = useState(defaultCapSelect);
	const [retailerSelect, setRetailerSelect] = useState({});
	const {value, done, execute} = doSelectAll;

	useEffect(() => {
		if (data?.headers) {
			const tempObj = {};
			for (const header of data.headers) {
				tempObj[header.retailer] = header.cap === "O" ? false : false;
			}
			setRetailerSelect(tempObj);
			setCapSelect(defaultCapSelect);
		}
	}, [data?.headers?.[0]?.retailer]);

	useEffect(() => {
		if ((data?.headers) && (value !== "unset") && (done === false)) {
			execute();
			const tempObj = {};
			for (const header of data.headers) {
				tempObj[header.retailer] = value;
			}
			setRetailerSelect(tempObj);
			setCapSelect({capH: value, capO: value, capL: value});

		}
	}, [done]);



	const retailerBatchSelect = (retailers, value) => {
		const retObj = {};
		for (const ret of retailers) {
			retObj[ret] = value;
		}
		setRetailerSelect({...retailerSelect, ...retObj});
	};

	const handleCapSelect = cap => (nextValue = !capSelect[cap]) => {
		const map = {capH: "H", capL: "L", capO: "O"};
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
			{!loadingState && <TableHeader data={data?.headers} doRetailerSelect={[retailerSelect, handleRetailerSelect]} doCapSelect={[capSelect, handleCapSelect]}/>}
			<TableBody data={data?.body} errorState={errorState} doSelectAll={doSelectAll} loadingState={loadingState} headerSelections={[retailerSelect, capSelect]}/>
			<style jsx>{`
				font-size: 11px;
				background-color: white;
				width: ${loadingState ? "100%" : "fit-content"};
			`}</style>
		</div>
	);
};


export default Table;
