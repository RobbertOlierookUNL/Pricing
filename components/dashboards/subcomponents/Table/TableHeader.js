import React from "react";

import useRetailerSorter from "util/useRetailerSorter";

import {ballet_pink} from "../../../../lib/colors";
import TableCapHeader from "./TableCapHeader";
import TableRetailerHeader from "./TableRetailerHeader";
import useConfig from "../../../../util/useConfig";






const TableHeader = ({data, doCapSelect, doRetailerSelect}) => {
	const [retailerMode] = useConfig("retailerMode");
	const {sortedData, caphCount, caplCount, capoCount} = useRetailerSorter(data, retailerMode);
	return (
		<div>
			{/* <TableOptions/> */}
			<TableCapHeader doCapSelect={doCapSelect} caphCount={caphCount} caplCount={caplCount} capoCount={capoCount} />
			<TableRetailerHeader headers={sortedData} doRetailerSelect={doRetailerSelect} />
			<style jsx>{`
				background-color: ${ballet_pink.color};
				height: 32px;
				position: sticky;
				top: 0px;
				z-index: 2;
			`}</style>

		</div>
	);
};


export default TableHeader;
