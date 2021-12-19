import React from "react";

import { getDateStringFromValue, typesOfInterval } from "../../../lib/config";
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
	return {
		props: {
			mutationsPerInterval
		},
		revalidate: 60,
	};
}

export const getStaticPaths = async () => {
	// TODO: makeDynamic
	const categories = ["hc", "fds", "bpc", "rf", "umfeld"];
	const paths = categories.map((category) => ({
		params: { category },
	}));
	return { paths, fallback: false };

};
