import React from "react";

import { deleteAdviceRetailerFromCategory } from "../../util/reducers";
import { unilever_blue } from "../../lib/colors";
import { useStore } from "../../lib/Store";
import AdviceListRow from "./AdviceListRow";
import CloseButton from "../Button/CloseButton";
import EmailSelector from "./EmailSelector";






const AdviceListSubSector = ({title, data, category}) => {
	const [, dispatch] = useStore();

	const deleteThis = () => {
		dispatch(deleteAdviceRetailerFromCategory({
			category,
			retailer: title
		}));
	};
	return (
		<div>
			<div className="sub-sector-title">
				<EmailSelector retailer={title} category={category}/>
				<span className="header">RSP</span>
				<span className="header">Advies</span>
				<span className="header">Delta (€)</span>
				<span className="header">Delta (%)</span>
				<span className="header">Potentie</span>
				<span className="header close-button"><CloseButton onClick={deleteThis}/></span>
			</div>
			<div>
				{data.map((entry, i) => <AdviceListRow key={i} data={entry}/>)}
			</div>
			<style jsx>{`
        .sub-sector-title {
					width: 100%;
					display: inline-grid;
          grid-template-columns: 1fr 7ch 7ch 8ch 8ch 9ch 3ch;
          background-color: ${unilever_blue.color};
          color: ${unilever_blue.text};
          padding: 3px 3px 3px 15px;
        }
				.header {
					font-size: 0.8em;
					text-align: center;
					margin-left: 2px;
					border-left: 2px solid white;
				}
				.close-button {
					margin-left: 0;
					transform: translateX(2px);
				}
      `}</style>
		</div>
	);
};


export default AdviceListSubSector;
