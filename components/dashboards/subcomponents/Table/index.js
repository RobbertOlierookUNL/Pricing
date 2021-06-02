import React from "react";

import retailers from "../../../../lib/retailers";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";


const Table = ({headers, twoCap = false, data}) => {
	return (
		<div>
			<TableHeader/>
			<TableBody/>
		</div>
	);
};


export default Table;
