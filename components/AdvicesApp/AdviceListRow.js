import NumberFormat from "react-number-format";
import React, {useState} from "react";

import { calculateMargin, calculateVolume } from "../../util/functions";
import { unilever_blue } from "../../lib/colors";
import { updateAdvice, deleteAdvice } from "../../util/reducers";
import { useStore } from "../../lib/Store";
import CloseButton from "../Button/CloseButton";
import EuroFormat from "../EuroFormat";









const AdviceListRow = ({data}) => {
	// const [rsp, setRsp] = useState(data.rsp);
	// const [advice, setAdvice] = useState(data.advice);
	const [, dispatch] = useStore();
	const {category, brand, concept, ean, retailer, pk} = data;
	const [marginOverride, setMarginOverride] = useState(false);

	const update = (property) => (e) => {
		const value = e.floatValue;
		dispatch(updateAdvice({
			property,
			value,
			category,
			brand,
			concept,
			ean: pk,
			retailer
		}));
	};

	const updateText = (property) => (e) => {
		const value = e.target.value;
		dispatch(updateAdvice({
			property,
			value,
			category,
			brand,
			concept,
			ean: pk,
			retailer
		}));
	};

	const updateMargin = (e) => {
		const value = calculateVolume(data.advice, data.rsp, e.floatValue);
		dispatch(updateAdvice({
			property: "volume",
			value,
			category,
			brand,
			concept,
			ean: pk,
			retailer
		}));
	};

	const deleteThis = () => {
		dispatch(deleteAdvice({
			category,
			brand,
			concept,
			ean: pk,
			retailer
		}));
	};

	return (
		<div className="row">
			<div className="cell">
				<input type="text" className="hidden-input" value={ean} onChange={updateText("ean")}/>
			</div>
			<div className="cell left">
				<input type="text" className="hidden-input" value={data.description} onChange={updateText("description")}/>
			</div>
			<div className="cell">
				<EuroFormat value={data.rsp} displayType="input" onValueChange={update("rsp")}/>
			</div>
			<div className="cell">
				<EuroFormat value={data.advice} displayType="input" onValueChange={update("advice")}/>
			</div>
			<div className="cell">
				<NumberFormat
					thousandSeparator="."
					decimalSeparator=","
					decimalScale={2}
					fixedDecimalScale
					displayType="text"
					prefix={((data.advice - data.rsp) > 0) ? "+€" : "€"}
					value={data.advice - data.rsp}
				/>
			</div>
			<div className="cell">
				<NumberFormat
					thousandSeparator="."
					decimalSeparator=","
					decimalScale={2}
					fixedDecimalScale
					displayType="text"
					prefix={(((data.advice - data.rsp)/data.rsp)*100 > 0) && "+"}
					suffix="%"
					value={((data.advice - data.rsp)/data.rsp)*100}
				/>
			</div>
			<div className="cell" onClick={() => setMarginOverride(true)}>
				<EuroFormat value={calculateMargin(data.advice, data.rsp, data.volume)} displayType={marginOverride ? "input" : "text"} onValueChange={updateMargin} onBlur={() => setMarginOverride(false)} decimalScale={0}/>
			</div>
			<div className="cell center">
				<CloseButton onClick={deleteThis}/>
			</div>
			<style jsx>{`
        .row {
          display: inline-grid;
          grid-template-columns: 14ch 1fr 7ch 7ch 8ch 8ch 9ch 3ch;
          background-color: #eee;
          width: 100%;
        }
				.row:nth-child(2n) {
					background-color: #ddd;

				}
        .cell{
          border: 1px solid ${unilever_blue.color};
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

        .left {
          text-align: left;
        }
				.center {
					text-align: center;
				}
				.hidden-input {
					appearance: none;
					border:none;
					background-image:none;
					background-color:transparent;
					box-shadow: none;
					width: 100%;
				}


      `}
			</style>
		</div>
	);
};



export default AdviceListRow;
