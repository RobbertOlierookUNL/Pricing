import React from "react";

const Table = ({x, y, data}) => {
	return (
		<div>{data.map((entry, index) => <div key={index}>{entry}</div>)}</div>
	);
};


export default Table;
