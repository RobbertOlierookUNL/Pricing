import React from "react";

import { unilever_blue } from "../../../../lib/colors";



const TableRetailerHeader = ({headers, doRetailerSelect}) => {
	const [retailerSelect, handleRetailerSelect] = doRetailerSelect;


	// useEffect(() => {
	// 	headers.forEach((retailer) => {
	// 		if (retailerSelect[retailer.retailer]) {
	// 			handleRetailerSelect(retailer.retailer)(false);
	// 		}
	// 	});
	// }, [headers, activeConcept]);

	return (
		<div>
			<div/>
			{headers.map(retailer => <div className={`retailer clickable ${retailerSelect[retailer.retailer] ? "" : "deselect"}`}  onClick={handleRetailerSelect(retailer.retailer)} key={retailer.title}>{retailer.title}</div>)}
			<style jsx>{`
				display: inline-grid;
				grid-template-columns: 250px repeat(${headers.length}, minmax(58px, 1fr));
				height: 16px;
				width: 100%;

				.retailer {
					background-color: ${unilever_blue.color};
					color: ${unilever_blue.text};
					display: flex;
					justify-content: center;
					border: 1px solid #bbb;
					border-width: 0 1px 0 0;
					text-overflow: clip;
					white-space: nowrap;
					overflow: hidden;
				}
				.retailer:last-child {
					border-width: 0;
				}

				.deselect {
					background-color: #888;
				}
			`}</style>
		</div>
	);
};


export default TableRetailerHeader;
