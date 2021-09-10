import { useRouter } from "next/router";
import React, {useContext, useState, useEffect} from "react";

import { AdviceStore } from "../../../pages/_app";
import Button from "../../Button";
import Grower from "../subcomponents/Grower";




const PlanDashboardButtons = () => {
	const router = useRouter();
	const [{advice}, dispatch] = useContext(AdviceStore);
	const grabAdvice = () => {
		dispatch({type: "grabAdvice"});
		setTimeout(() => dispatch({type: "nextStep"}), 2000);

	};
	const mailAdvice = async () => {
		// try {
		// 	const body = JSON.stringify({
		// 		advice
		// 	});
		//
		// 	const res = await fetch("/api/email/test", {
		// 		method: "PATCH",
		// 		body,
		// 		headers: {
		// 			"Content-type": "application/json; charset=UTF-8"
		// 		}
		// 	});
		// 	console.log({res});
		// 	const json = await res.json();
		// 	if (!res.ok) throw Error(json.message);
		//
		// } catch (e) {
		// 	throw Error(e.message);
		// }
	};


	const goBack = () => router.back();
	return (
		<>
			<Button onClick={goBack} color="unilever_blue" variant="colored" width="fixed">Terug</Button>
			<Grower grow={1} />
			<Button color="unilever_blue" variant="text">Alles Selecteren</Button>
			<Button color="unilever_blue" variant="text">Alles Deselecteren</Button>
			<Button color="color_error" variant="colored" width="fixed" pushLeft onClick={mailAdvice}>Annuleren</Button>
			<Button color="color_good" variant="colored" width="fixed" pushLeft onClick={grabAdvice}>OK</Button>
		</>
	);
};

export default PlanDashboardButtons;
