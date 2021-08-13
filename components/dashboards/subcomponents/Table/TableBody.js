import React, {useContext} from "react";

import { AdviceStore } from "../../../../pages/_app";
import TableRow from "./TableRow";


const TableBody = ({data, loadingState, errorState, headerSelections}) => {
	const [state] = useContext(AdviceStore);
	console.log({state});

	return (
		<div>
			{loadingState && "loading"}
			{(!loadingState && !errorState && Array.isArray(data)) && data.map((entry, idx) => <TableRow entry={entry} headerSelections={headerSelections} even={(idx+2)%2 === 0} key={entry.EAN_CE}/>)}
		</div>
	);
};


export default TableBody;
