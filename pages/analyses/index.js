import React from "react";

import {
	getAllPossibleConceptNicknames,
	getAllRetailers
} from "../../util/api-functions/queries";
import { getNicknameTree } from "../../util/api-functions/query-helpers";
import { revalidate } from "../../lib/config";
import AnalysesApp from "../../components/AnalysesApp";





const AnalysesPage = (props) => {
	return (
		<AnalysesApp {...props}/>
	);
};


export async function getStaticProps() {
	const nicknames = await getAllPossibleConceptNicknames();
	const nicknameTree = getNicknameTree(nicknames);
	const pretailers = await getAllRetailers();
	const retailers = [];
	pretailers.forEach((item) => {
		retailers.push({...item});
	});


	console.log({nicknames, nicknameTree, retailers});

	return {
		props: {
			nicknameTree,
			retailers
		},
		revalidate,
	};
}


export default AnalysesPage;
