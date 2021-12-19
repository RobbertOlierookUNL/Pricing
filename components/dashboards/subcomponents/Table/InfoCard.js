import ContextMenu from "@agjs/react-right-click-menu";
import NumberFormat from "react-number-format";
import React from "react";

import {unilever_blue, bottle_green} from "../../../../lib/colors";
import EuroFormat from "../../../EuroFormat";
import HideSkuMenu from "./HideSkuMenu";
import useConfig from "../../../../util/useConfig";






const InfoCard = ({info, even, adviceHigh, handleHighChange, adviceLow, handleLowChange, doRowSelect, umfeld}) => {
	const [rowSelect, handleRowSelect] = doRowSelect;
	const [infoMode] = useConfig("infoMode");
	let actualInfo = info.EAN_CE;
	let infoinfo = "EAN";
	let isMoney = false;
	if (infoMode === "volume" && !umfeld) {
		actualInfo = info.totalVolume;
		infoinfo = "CE:";
	} else if (infoMode === "worth" && !umfeld) {
		actualInfo = info.approxWorth;
		isMoney = true;
		infoinfo = "Totaalwaarde:";
	}
	const prefix = isMoney ? "€" : "";
	const thouSep = infoinfo === "EAN" ? "" : ".";
	const [isMenuShown, setIsMenuShown] = React.useState(false);
	const ref = React.useRef();


	return (
		<>
			{/* <ContextMenu
				isOpenAfterInteraction={false}
				trigger={ref}
				component={<HideSkuMenu ean={info.EAN_CE}/>}
				isOpen={isMenuShown}
				setIsOpen={setIsMenuShown}
				style={{ zIndex: 2, transform: "translate(-114px, -14px)", }}

			/> */}

			<div ref={ref} className={`info-grid ${rowSelect ? "" : "deselect"}`} >
				<div className="description clickable" onClick={handleRowSelect}>{info.Artikelomschrijving}</div>
				<div className="caph clickable" onClick={handleRowSelect}>{umfeld || <><small>CAP H: </small><EuroFormat value={info.CAP_H}/></>}</div>
				<div className="clickzone clickable" onClick={handleRowSelect}>{umfeld || infoinfo}</div>
				<div className="adviceh">{umfeld || <><small>Advice H: </small><span className="contain"><EuroFormat value={adviceHigh} onValueChange={handleHighChange} displayType="input" height="12px"/></span></>}</div>
				<div className="info clickable" onClick={handleRowSelect}><NumberFormat thousandSeparator={thouSep} decimalSeparator="," prefix={prefix} decimalScale={0} displayType="text" value={actualInfo}/></div>
				<div className="capl clickable" onClick={handleRowSelect}>{umfeld || <><small>CAP L: </small><EuroFormat value={info.CAP_L}/></>}</div>
				<div className="advicel">{umfeld || <><small>Advice L: </small><span className="contain"><EuroFormat value={adviceLow} onValueChange={handleLowChange} displayType="input" height="12px"/></span></>}</div>

			</div>
			<style jsx>{`
			.info-grid {
				padding: 2px;
				display: grid;
				grid-template: "description description description" 13px
											 "clickzone caph adviceh" 13px
											 "info capl advicel" 13px
											 / 1fr 70px 100px;
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
				${umfeld ? "" : `text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				direction: rtl;
				`}
				font-weight: bold;
			}
			.caph {
				grid-area: caph;
				text-align: right;

			}
			.adviceh {
				grid-area: adviceh;
				text-align: right;
			}
			.info {
				grid-area: info;
				font-weight: lighter;
				font-size: 0.9em;
				transform: translateY(2px);

			}
			.clickzone {
				grid-area: clickzone;
				font-size: 0.8em;
				transform: translateY(5px);

			}
			.capl {
				grid-area: capl;
				text-align: right;
				text-align: right;


			}
			.advicel {
				grid-area: advicel;
				text-align: right;

			}
			.contain {
				width: 40px;
				display: inline-block;
			}
			small {
				font-family: monospace;
				font-size: 0.8em
			}
		`}</style>
		</>
	);
};



export default InfoCard;
