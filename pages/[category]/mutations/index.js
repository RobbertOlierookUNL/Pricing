import React from "react";

import {
	categories,
	fallback,
	getDateStringFromValue,
	revalidate,
	typesOfInterval
} from "../../../lib/config";
import { getLastRefresh } from "../../../util/api-functions/queries";
import MutationDashboard from "../../../components/dashboards/MutationDashboard";
import getMutations from "../../../util/api-functions/end-points/get-mutations";







const MutationDashboardPage = ({mutationsPerInterval}) => {
	return (
		<MutationDashboard mutationsPerInterval={mutationsPerInterval}/>
	);
};


export default MutationDashboardPage;

export async function getStaticProps({ params }) {

	const {category} = params;
	const intervals = typesOfInterval.map(e => e.value);
	const mutationsPerInterval = {};
	for (const interval of intervals) {
		const i = getDateStringFromValue(interval);
		const mutations = await getMutations(category, i);
		mutationsPerInterval[interval] = mutations;
	}
	const lastRefresh = await getLastRefresh();
	return {
		props: {
			mutationsPerInterval,
			lastRefresh
		},
		revalidate,
	};
}

export const getStaticPaths = async () => {
	// TODO: makeDynamic

	const paths = categories.map((category) => ({
		params: { category },
	}));
	return { paths, fallback };

};
