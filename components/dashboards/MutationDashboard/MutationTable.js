import Link from "next/link";
import NumberFormat from "react-number-format";
import React from "react";

import { bottle_green, sunset_red, unilever_blue } from "../../../lib/colors";
import EuroFormat from "../../EuroFormat";
import SkeletonRows from "../subcomponents/Table/SkeletonRows";
import useCategory from "../../../util/useCategory";
import useConfig from "../../../util/useConfig";






const MutationRow = ({description, brand, concept, ean, retailer, oldPrice, newPrice}) => {
	const cat = useCategory();
	const diff = newPrice - oldPrice;
	const diffPer = diff / oldPrice * 100;
	return (
		<div className="row">
			<div className="cell cut-left">
				<Link href={`/${cat}/overview?b=${brand}`}>{brand}</Link>
			</div>
			<div className="cell cut-left">
				<Link href={`/${cat}/overview?b=${brand}&c=${concept}`}>{concept}</Link>
			</div>
			<div className="cell cut-left">{ean}</div>
			<div className="cell cut-left">{description}</div>
			<div className="cell">{retailer}</div>
			<div className="cell"><EuroFormat value={oldPrice}/></div>
			<div className="cell"><EuroFormat value={newPrice}/></div>
			<div className="cell colored">
				<NumberFormat
					thousandSeparator="."
					decimalSeparator=","
					decimalScale={2}
					fixedDecimalScale
					displayType="text"
					prefix={(diff > 0) ? "+€" : "€"}
					value={diff}
				/></div>
			<div className="cell colored">
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
            display: inline-grid;
            /* display: grid; */
            grid-template-columns: 1fr 2fr 14ch 4fr 12ch 8ch 8ch 8ch 8ch;
            background-color: #eee;
            width: 100%;
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
          .colored {
            color: ${diff > 0 ? bottle_green.color
			: sunset_red.color};
          }

      `}</style>
		</div>
	);
};

const MutationTable = ({data, loadingState, errorState, specificRetailer}) => {
	const [retailerMode] = useConfig("retailerMode");
	console.log({specificRetailer, retailerMode});

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
	function retailerCompare( a, b ) {
		if ( a.retailer < b.retailer ){
			return -1;
		}
		if ( a.retailer > b.retailer ){
			return 1;
		}
		return 0;
	}
	function retailerFilter(a) {
		if (specificRetailer) {
			return a.retailer === specificRetailer;
		}
		if (!retailerMode) {
			return a.priority;
		}
		return true;
	}
	return (
		<div>
			{loadingState && <SkeletonRows/>}
			{(!loadingState && !errorState && Array.isArray(data)) && data.filter(retailerFilter).sort(retailerCompare).sort(conceptCompare).sort(brandCompare).map((entry, idx) => (
      		<MutationRow {...entry} key={idx}/>
			))}
			<style jsx>{`
        font-size: 0.9em;
      `}</style>
		</div>
	);
};


export default MutationTable;
