import React, {useState, useEffect} from "react";
import EuroFormat from "../../../EuroFormat";

import {unilever_blue, bottle_green} from "../../../../lib/colors";


const InfoCard = ({info, even, adviceHigh, handleHighChange, adviceLow, handleLowChange, doRowSelect}) => {
	const [rowSelect, handleRowSelect] = doRowSelect;


	return (
		<div className={`info-grid ${rowSelect ? "" : "deselect"}`} >
			<div className="description clickable" onClick={handleRowSelect}>{info.Artikelomschrijving}</div>
			<div className="caph clickable" onClick={handleRowSelect}><EuroFormat value={info.CAP_H}/></div>
			<div className="clickzone clickable" onClick={handleRowSelect}/>
			<div className="adviceh"><EuroFormat value={adviceHigh} onValueChange={handleHighChange} displayType="input" /></div>
			<div className="ean clickable" onClick={handleRowSelect}>{info.EAN_CE}</div>
			<div className="capl clickable" onClick={handleRowSelect}><EuroFormat value={info.CAP_L}/></div>
			<div className="advicel"><EuroFormat value={adviceLow} onValueChange={handleLowChange} displayType="input"/></div>
			<style jsx>{`
				.info-grid {
					padding: 2px;
					display: grid;
					grid-template: "description description description" 13px
				                 "clickzone caph adviceh" 13px
				                 "ean capl advicel" 13px
				                 / 1fr 40px 40px;
					background-color: ${even ? bottle_green.color : unilever_blue.color};
					color: ${even ? bottle_green.text : unilever_blue.text};
					position: sticky;
					left: 0;
					z-index: 1;
				}

				.deselect {
					background-color: ${even ? "#666" : "#888"};
				}

				.description {
					grid-area: description;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					direction: rtl;
					font-weight: bold;
				}
				.caph {
					grid-area: caph;
				}
				.adviceh {
					grid-area: adviceh;
				}
				.ean {
					grid-area: ean;
					font-weight: lighter;
					font-size: 0.9em;
				}
				.clickzone {
					grid-area: clickzone;
				}
				.capl {
					grid-area: capl;
				}
				.advicel {
					grid-area: advicel;
				}
			`}</style>
		</div>
	);
};



export default InfoCard;
