import React, {useContext} from "react";
import TableCapHeader from "./TableCapHeader";
import TableRetailerHeader from "./TableRetailerHeader";
import useRetailerSorter from "util/useRetailerSorter";
import {ballet_pink} from "../../../../lib/colors";
import { RetailerMode } from "../../../../pages/[category]/plan";




const TableHeader = ({data, doCapSelect, doRetailerSelect}) => {
	const [retailerMode] = useContext(RetailerMode);
	const {sortedData, caphCount, caplCount, capoCount} = useRetailerSorter(data, retailerMode);
	return (
		<div>
			<TableCapHeader active={!!sortedData} doCapSelect={doCapSelect} caphCount={caphCount} caplCount={caplCount} capoCount={capoCount} />
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
