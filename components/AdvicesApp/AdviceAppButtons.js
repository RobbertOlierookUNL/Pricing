import { useRouter } from "next/router";
import React from "react";

import { grabAdvice, nextStep } from "../../util/reducers";
import { useStore } from "../../lib/Store";
import Button from "../Button";
import Grower from "../dashboards/subcomponents/Grower";
import useCardRouter from "../../util/useCardRouter";
import useConfig from "../../util/useConfig";











const AdviceAppButtons = () => {
	const router = useRouter();
	const goToRoute = useCardRouter();
	const [{advice}] = useStore();
	const [info] = useConfig("adviceInfo");

	const mailAdvice = async () => {
		try {
			const body = JSON.stringify({
				advice,
				info
			});

			const res = await fetch("/api/email/send-all-mails", {
				method: "PATCH",
				body,
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			});
			console.log({res});
			const json = await res.json();
			console.log({json});
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
			<Button color="unilever_blue" variant="text">Alles Selecteren</Button>
			<Button color="unilever_blue" variant="text">Alles Deselecteren</Button>
			<Button color="unilever_blue" variant="colored" width="fixed" pushLeft onClick={goBack}>Dashboard</Button>
			<Button color="color_good" variant="colored" width="fixed" pushLeft onClick={mailAdvice}>Versturen</Button>
		</>
	);
};

export default AdviceAppButtons;
