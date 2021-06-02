import React from "react";
import TableCapHeader from "./TableCapHeader";

const TableHeader = ({headers, twoCap}) => {
	return (
		<div>
			{twoCap && <TableCapHeader/>}
		</div>
	);
};


export default TableHeader;
