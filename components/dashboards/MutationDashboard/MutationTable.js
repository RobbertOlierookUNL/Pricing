import NumberFormat from "react-number-format";
import React from "react";

import { unilever_blue } from "../../../lib/colors";
import EuroFormat from "../../EuroFormat";
import SkeletonRows from "../subcomponents/Table/SkeletonRows";



const MutationRow = ({description, brand, concept, ean, retailer, oldPrice, newPrice}) => {
	console.log({description, brand});
	const diff = newPrice - oldPrice;
	const diffPer = diff / oldPrice * 100;
	return (
		<div className="row">
			<div className="cell cut-left">{brand}</div>
			<div className="cell cut-left">{concept}</div>
			<div className="cell cut-left">{ean}</div>
			<div className="cell cut-left">{description}</div>
			<div className="cell">{retailer}</div>
			<div className="cell"><EuroFormat value={oldPrice}/></div>
			<div className="cell"><EuroFormat value={newPrice}/></div>
			<div className="cell">
				<NumberFormat
					thousandSeparator="."
					decimalSeparator=","
					decimalScale={2}
					fixedDecimalScale
					displayType="text"
					prefix={(diff > 0) ? "+€" : "€"}
					value={diff}
				/></div>
			<div className="cell">
				<NumberFormat
					thousandSeparator="."
					decimalSeparator=","
					decimalScale={2}
					fixedDecimalScale
					displayType="text"
					prefix={(diffPer > 0) && "+"}
					suffix="%"
					value={diffPer}
				/></div>
			<style jsx>{`
          .row {
            height: 17px;
            display: inline-grid;
            /* display: grid; */
            grid-template-columns: 10ch 20ch 14ch 40ch 10ch 8ch 8ch 8ch 8ch;
            background-color: #eee;
            width: fit-content;
          }
          .row:nth-child(2n) {
            background-color: #ddd;
          }
          .cut-left {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            direction: rtl;
          }
          .cell{
            border: 1px solid #bbb;
            border-top: 0;
            border-bottom: 0;
            text-align: right;
            padding: 2px;
          }
          .cell:first-child {
            border-left: 0;
          }
          .cell:last-child {
            border-right: 0;
          }

      `}</style>
		</div>
	);
};

const MutationTable = ({data, loadingState, errorState}) => {
	function brandCompare( a, b ) {
		if ( a.brand < b.brand ){
			return -1;
		}
		if ( a.brand > b.brand ){
			return 1;
		}
		return 0;
	}
	function conceptCompare( a, b ) {
		if ( a.concept < b.concept ){
			return -1;
		}
		if ( a.concept > b.concept ){
			return 1;
		}
		return 0;
	}
	return (
		<div>
			{loadingState && <SkeletonRows/>}
			{(!loadingState && !errorState && Array.isArray(data)) && data.sort(conceptCompare).sort(brandCompare).map((entry, idx) => (
      		<MutationRow {...entry} key={idx}/>
			))}
			<style jsx>{`
        font-size: 0.7em;
      `}</style>
		</div>
	);
};


export default MutationTable;
