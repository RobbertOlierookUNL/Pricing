import React, {useContext} from "react";

import useRetailerSorter from "util/useRetailerSorter";

import { RetailerMode } from "../../../../pages/[category]/plan";
import {ballet_pink} from "../../../../lib/colors";
import TableCapHeader from "./TableCapHeader";
import TableOptions from "./TableOptions";
import TableRetailerHeader from "./TableRetailerHeader";





const TableHeader = ({data, doCapSelect, doRetailerSelect}) => {
	const [retailerMode] = useContext(RetailerMode);
	const {sortedData, caphCount, caplCount, capoCount} = useRetailerSorter(data, retailerMode);
	return (
		<div>
			{/* <TableOptions/> */}
			<TableCapHeader active={!!(caphCount || caplCount)} doCapSelect={doCapSelect} caphCount={caphCount} caplCount={caplCount} capoCount={capoCount} />
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
