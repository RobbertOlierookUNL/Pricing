import React, {useEffect, useContext} from "react";

import { ActiveConcept } from "../../../../pages/[category]/plan";
import {bottle_green} from "../../../../lib/colors";
import TableOptions from "./TableOptions";


const TableCapHeader = ({caphCount, capoCount, caplCount, doCapSelect}) => {
	const [capSelect, handleCapSelect] = doCapSelect;
	// const [activeConcept] = useContext(ActiveConcept);

	// useEffect(() => {
	// 	if (capSelect.capH) {
	// 		handleCapSelect("capH")(false);
	// 	}
	// 	if (capSelect.capL) {
	// 		handleCapSelect("capL")(false);
	// 	}
	// }, [activeConcept]);



	return (
		<div>
			<TableOptions/>
			{caphCount ? <div className={`caph clickable visible-cap ${capSelect.capH ? "" : "deselect"}`} onClick={() => handleCapSelect("capH")()}>CAP H</div> : <></>}
			{capoCount ? <div className="capo" onClick={() => handleCapSelect("capO")()}/> : <></>}
			{caplCount ? <div className={`capl clickable visible-cap ${capSelect.capL ? "" : "deselect"}`} onClick={() => handleCapSelect("capL")()}>CAP L</div> : <></>}
			<style jsx>{`
				width: 100%;
				display: inline-grid;
				height: 16px;
				grid-template-columns: 250px
															${caphCount ? `[start-caph] repeat(${caphCount}, minmax(58px, 1fr))` : ""}
															${capoCount ? `[start-capo] repeat(${capoCount}, minmax(58px, 1fr))` : ""}
															${caplCount ? `[start-capl] repeat(${caplCount}, minmax(58px, 1fr))` : ""};

				.caph {
					grid-column: start-caph / span ${caphCount};
					${capoCount ? "" : "border: 1px solid #bbb; border-width: 0 1px 0 0;"}

				}
				.capo {
					grid-column: start-capo / span ${capoCount}
				}
				.capl {
					grid-column: start-capl / span ${caplCount};
				}
				.visible-cap {
					background-color: ${bottle_green.color};
					color: ${bottle_green.text};
					display: flex;
					justify-content: center;
					border-top-left-radius: 7px;
					border-top-right-radius: 7px;
				}
				.deselect {
					background-color: #666;
				}
			`}</style>
		</div>
	);
};


export default TableCapHeader;
