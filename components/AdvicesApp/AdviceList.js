import React from "react";

import AdviceListSector from "./AdviceListSector";


const AdviceList = ({data}) => {

	return (
		<div>
			{Object.keys(data).map(cat => <AdviceListSector key={cat} title={cat} data={data[cat]}/>)}
		</div>
	);
};


export default AdviceList;
