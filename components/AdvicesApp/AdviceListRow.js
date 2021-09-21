import NumberFormat from "react-number-format";
import React from "react";

import { unilever_blue } from "../../lib/colors";
import EuroFormat from "../EuroFormat";




const AdviceListRow = ({data}) => {
	return (
		<div className="row">
			<div className="cell">
				{data.EAN}
			</div>
			<div className="cell left">
				{data.Productomschrijving}
			</div>
			<div className="cell">
				<EuroFormat value={data.RSP}/>
			</div>
			<div className="cell">
				<EuroFormat value={data.Adviesprijs}/>
			</div>
			<div className="cell">
				<NumberFormat
					thousandSeparator="."
					decimalSeparator=","
					decimalScale={2}
					fixedDecimalScale
					displayType="text"
					prefix="+€"
					value={data.Adviesprijs - data.RSP}
				/>
			</div>
			<div className="cell">
				<NumberFormat
					thousandSeparator="."
					decimalSeparator=","
					decimalScale={2}
					fixedDecimalScale
					displayType="text"
					prefix="+"
					suffix="%"
					value={((data.Adviesprijs - data.RSP)/data.RSP)*100}
				/>
			</div>
			<div className="cell">
				<EuroFormat value={data.Marge} decimalScale={0}/>
			</div>
			<style jsx>{`
        .row {
          display: inline-grid;
          grid-template-columns: 14ch 1fr 6ch 6ch 8ch 8ch 9ch;
          background-color: white;
          width: 100%;
        }
        .cell{
          border: 1px solid ${unilever_blue.color};
          text-align: right;
          padding: 2px;
        }

        .left {
          text-align: left;
        }


      `}
			</style>
		</div>
	);
};



export default AdviceListRow;
