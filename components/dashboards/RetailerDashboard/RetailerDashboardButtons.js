import { useRouter } from "next/router";
import React from "react";

import { grabAdvice, nextStep } from "../../../util/reducers";
import { useStore } from "../../../lib/Store";
import Button from "../../Button";
import Grower from "../subcomponents/Grower";
import useCardRouter from "../../../util/useCardRouter";








const PlanDashboardButtons = ({selectAll}) => {
	const router = useRouter();
	const goToRoute = useCardRouter();
	const [{advice}, dispatch] = useStore();
	const grabAllAdvice = () => {
		dispatch(grabAdvice());
		setTimeout(() => dispatch(nextStep()), 500);

	};
	const mailAdvice = async () => {
		try {
			const body = JSON.stringify({
				advice
			});

			const res = await fetch("/api/email/test", {
				method: "PATCH",
				body,
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			});
			console.log({res});
			const json = await res.json();
			if (!res.ok) throw Error(json.message);

		} catch (e) {
			throw Error(e.message);
		}
	};


	const goBack = () => router.back();
	return (
		<>
			<Button onClick={goBack} color="color_error" variant="colored" width="fixed">Terug</Button>
			<Grower grow={1} />
			<Button color="unilever_blue" variant="text" onClick={selectAll(true)}>Alles Selecteren</Button>
			<Button color="unilever_blue" variant="text" onClick={selectAll(false)}>Alles Deselecteren</Button>
			<Button color="unilever_blue" variant="colored" width="fixed" pushLeft onClick={goToRoute("advices")}>Adviezen</Button>
			<Button color="color_good" variant="colored" width="fixed" pushLeft onClick={grabAllAdvice}>Toevoegen</Button>
		</>
	);
};

export default PlanDashboardButtons;
