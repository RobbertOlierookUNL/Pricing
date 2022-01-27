import React, {useState} from "react";

import { bottle_green } from "../../../lib/colors";
import PrioritySeed from "./seeds/PrioritySeed";



const RetailerSelector = ({title, retailers, dispatch}) => {
	const [localState, setLocalState] = useState(true);
	let prio = 0;
	for (const e of retailers) {
		if (e.priority != 0) {
			prio++;
		}
	}

	return (
		<>
			<div className="title">
				{title}
			</div>
			<div className="ret-grid">
			 	<PrioritySeed retailers={retailers} dispatch={dispatch} width={prio} prio/>
				<PrioritySeed retailers={retailers} dispatch={dispatch} width={retailers.length - prio}/>



			</div>
			<style jsx>{`
					.ret-grid {
						display: grid;
						grid-template: repeat(${retailers.length}, 20px) / 150px 250px;
						gap: 2px;
						padding: 15px;
					}
					.title {
						background-color: ${bottle_green.color};
						color: ${bottle_green.text};
						padding: 5px 15px;
					}
				`}</style>
		</>
	);
};


export default RetailerSelector;
