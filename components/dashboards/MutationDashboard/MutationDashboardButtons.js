import { useRouter } from "next/router";
import React from "react";

import Button from "../../Button";
import Grower from "../subcomponents/Grower";


















const MutationDashboardButtons = () => {
	const router = useRouter();



	const goBack = () => router.back();

	return (
		<>
			<Button onClick={goBack} color="color_error" variant="colored" width="fixed">Terug</Button>
			<Grower grow={1} />
		</>
	);
};

export default MutationDashboardButtons;
