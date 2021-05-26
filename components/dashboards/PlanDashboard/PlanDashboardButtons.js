import React from "react";
import { useRouter } from "next/router";


import Button from "../../Button";
import Grower from "../subcomponents/Grower";



const PlanDashboardButtons = () => {
	const router = useRouter();

	const goBack = () => router.back();
	return (
		<>
			<Button onClick={goBack} color="unilever_blue" variant="colored" width="fixed">Terug</Button>
			<Grower grow={1} />
			<Button color="unilever_blue" variant="text">Alles Selecteren</Button>
			<Button color="unilever_blue" variant="text">Alles Deselecteren</Button>
			<Button color="color_error" variant="colored" width="fixed" pushLeft>Annuleren</Button>
			<Button color="color_good" variant="colored" width="fixed" pushLeft>OK</Button>
		</>
	);
};

export default PlanDashboardButtons;
