import React from "react";

import { bottle_green } from "../../../lib/colors";
import ClusterSeed from "./seeds/ClusterSeed";






const ConceptSelector = ({title, nicknameTree, dispatch}) => {
	let totalNicknames = 0;
	const clusterWidth = {};
	const brandWidth = {};
	for (const [cluster, brands] of Object.entries(nicknameTree)) {
		clusterWidth[cluster] = 0;
		brandWidth[cluster] = {};
		for (const [brand, nicknames] of Object.entries(brands)) {
			brandWidth[cluster][brand] = 0;
			for (var i = 0; i < Object.keys(nicknames).length; i++) {
				totalNicknames++;
				clusterWidth[cluster]++;
				brandWidth[cluster][brand]++;
			}
		}
	}
	return (
		<>
			<div className="title">
				{title}
			</div>
			<div className="concept-grid">
				{Object.keys(clusterWidth).map(e => (
					<ClusterSeed key={e} cluster={e} dispatch={dispatch} length={clusterWidth[e]} data={nicknameTree[e]} brandWidth={brandWidth}/>
				))}

			</div>
			<style jsx>{`
				.concept-grid {
					display: grid;
					grid-template: repeat(${totalNicknames}, 20px) / 150px 250px 250px;
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


export default ConceptSelector;
