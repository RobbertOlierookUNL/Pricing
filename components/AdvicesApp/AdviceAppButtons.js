import { useRouter } from "next/router";
import React from "react";

import { excelDownloader } from "../../util/functions";
import { useStore } from "../../lib/Store";
import Button from "../Button";
import Grower from "../dashboards/subcomponents/Grower";
import useCardRouter from "../../util/useCardRouter";
import useConfig from "../../util/useConfig";
import useMySnackbar from "../../util/useMySnackbar";

















const AdviceAppButtons = () => {
	const router = useRouter();
	const goToRoute = useCardRouter();
	const [{advice}] = useStore();
	const [info] = useConfig("adviceInfo");
	const [openSnackbar, openErrorSnackbar] = useMySnackbar();




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
			if (json?.done) {
				openSnackbar("De adviezen zijn verstuurd!");
			}
			if (!res.ok) {
				console.log({res});
				 openErrorSnackbar("Er is iets misgegaan...");
			 }

		} catch (e) {
			console.log({e});
			openErrorSnackbar("Er gaat iets fout...");
		}
	};

	const downloadAdvice = async () => {
		try {
			const body = JSON.stringify({
				advice,
				info
			});

			const res = await fetch("/api/download/get-advice-buffers", {
				method: "PATCH",
				body,
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			});
			console.log({res});
			const buffers = await res.json();
			for (const {excelBuffer, name} of buffers) {
				excelDownloader(excelBuffer, name);
			}

			if (!res.ok) openErrorSnackbar("Er is iets misgegaan...");

		} catch (e) {
			console.log({e});
			openErrorSnackbar("Er gaat iets fout...");
		}
	};


	const goBack = () => router.back();

	return (
		<>
			<Button onClick={goBack} color="color_error" variant="colored" width="fixed">Terug</Button>
			<Grower grow={1} />
			<Button color="unilever_blue" variant="colored" width="fixed" pushLeft onClick={goBack}>Dashboard</Button>
			<Button color="unilever_blue" variant="colored" width="fixed" pushLeft onClick={downloadAdvice}>Download</Button>
			<Button color="color_good" variant="colored" width="fixed" pushLeft onClick={mailAdvice}>Versturen</Button>
		</>
	);
};

export default AdviceAppButtons;
