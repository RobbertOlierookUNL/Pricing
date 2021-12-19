import { useRouter } from "next/router";
import React from "react";

import { grabAdvice, nextStep } from "../../../util/reducers";
import { useStore } from "../../../lib/Store";
import Button from "../../Button";
import Grower from "../subcomponents/Grower";
import useCardRouter from "../../../util/useCardRouter";
import useConfig from "../../../util/useConfig";









const PlanDashboardButtons = ({selectAll}) => {
	const router = useRouter();
	const goToRoute = useCardRouter();
	const goToCategoryRoute = useCardRouter("category");

	const [, set] = useConfig("triggerSaveAdvicePrices");
	const triggerSaveAdvicePrices = () => {
		set(true);
		setTimeout(() => dispatch(set(false)), 500);
	};

	const [, dispatch] = useStore();
	const grabAllAdvice = () => {
		dispatch(grabAdvice());
		setTimeout(() => dispatch(nextStep()), 500);

	};
	// const mailAdvice = async () => {
	// 	try {
	// 		const body = JSON.stringify({
	// 			advice
	// 		});
	//
	// 		const res = await fetch("/api/email/test", {
	// 			method: "PATCH",
	// 			body,
	// 			headers: {
	// 				"Content-type": "application/json; charset=UTF-8"
	// 			}
	// 		});
	// 		console.log({res});
	// 		const json = await res.json();
	// 		if (!res.ok) throw Error(json.message);
	//
	// 	} catch (e) {
	// 		throw Error(e.message);
	// 	}
	// };


	const goBack = () => router.back();
	return (
		<>
			<Button onClick={goBack} color="color_error" variant="colored" width="fixed">Terug</Button>
			<Button color="unilever_blue" variant="colored" width="fixed" pushLeft onClick={goToRoute("advices")}>Adviezen</Button>
			<Button color="unilever_blue" variant="colored" width="fixed" pushLeft onClick={goToCategoryRoute("")}>Dashboards</Button>

			<Grower grow={1} />
			<Button color="unilever_blue" variant="text" onClick={selectAll(true)}>Alles Selecteren</Button>
			<Button color="unilever_blue" variant="text" onClick={selectAll(false)}>Alles Deselecteren</Button>
			<Button color="unilever_blue" variant="colored" width="auto" pushLeft onClick={triggerSaveAdvicePrices}>Adviesprijzen opslaan</Button>
			<Button color="color_good" variant="colored" width="auto" pushLeft onClick={grabAllAdvice}>Toevoegen aan advies</Button>
		</>
	);
};

export default PlanDashboardButtons;
