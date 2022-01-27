import { useRouter } from "next/router";
import React from "react";

import { excelDownloader } from "../../util/functions";
import { useStore } from "../../lib/Store";
import Button from "../Button";
import Grower from "../dashboards/subcomponents/Grower";
import useCardRouter from "../../util/useCardRouter";
import useConfig from "../../util/useConfig";
import useMySnackbar from "../../util/useMySnackbar";

















const AnalysesAppButtons = ({doReport, states, clearReport, downloadReport}) => {
	const router = useRouter();
	const goBack = () => router.back();


	return (
		<>
			<Button onClick={goBack} color="color_error" variant="colored" width="fixed">Terug</Button>
			<Grower grow={1} />
			{states.reportDone && <Button color="unilever_blue" variant="colored" width="fixed" pushLeft onClick={downloadReport}>Download</Button>}
			{states.reportDone && <Button color="color_error" variant="colored" width="auto" pushLeft onClick={clearReport}>Rapport resetten</Button>}
			{states.noReport && <Button color="color_good" variant="colored" width="auto" pushLeft onClick={doReport}>Creëer rapport</Button>}
		</>
	);
};

export default AnalysesAppButtons;
