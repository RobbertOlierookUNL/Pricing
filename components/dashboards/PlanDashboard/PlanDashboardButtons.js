import { useRouter } from "next/router";
import React, {useState, useEffect} from "react";

import { grabAdvice, nextStep } from "../../../util/reducers";
import { useStore } from "../../../lib/Store";
import Button from "../../Button";
import DashboardFooterButtonContainer from
	"../subcomponents/DashboardFooterButtonContainer";
import Grower from "../subcomponents/Grower";
import Modal from "../subcomponents/Modal";
import useCardRouter from "../../../util/useCardRouter";
import useConfig from "../../../util/useConfig";
import useMySnackbar from "../../../util/useMySnackbar";












const PlanDashboardButtons = ({selectAll, download, savePriceCheck}) => {
	console.log({savePriceCheck});
	const [openModal, setOpenModal] = useState(false);
	const [priceCheck, setPriceCheck] = useState(savePriceCheck);
	const router = useRouter();
	const goToRoute = useCardRouter();
	const goToCategoryRoute = useCardRouter("category");
	const [openSnackbar] = useMySnackbar();

	const closeModal = () => setOpenModal(false);
	const [, set] = useConfig("triggerSaveAdvicePrices");

	const save = () => {
		priceCheck ? setOpenModal(true) : triggerSaveAdvicePrices();
	};
	const triggerSaveAdvicePrices = () => {
		set(true);
		setTimeout(() => {
			set(false);
			openSnackbar("Adviesprijzen opgeslagen");
			setPriceCheck(true);
		}, 1000);
	};


	useEffect(() => {
	  setPriceCheck(savePriceCheck);
	}, [savePriceCheck]);

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
			{openModal && <Modal close={closeModal} width="300px" header="Weet je het zeker?">
				<div style={{padding: "0px 0 15px", textAlign: "justify"}}>Een of meerdere van deze EANs heeft al een opgeslagen adviesprijs.
					Weet je zeker dat je de adviesprijs van alle hier zichtbare EANs wilt opslaan, ookal overschrijf je hiermee oude prijzen?
				</div>
				<DashboardFooterButtonContainer paddingless>
					<Button color="color_good" variant="colored" width="fixed" onClick={triggerSaveAdvicePrices}>Ja</Button>
					<Grower grow={1} />
					<Button color="color_error" variant="colored" width="fixed" pushLeft onClick={closeModal}>Annuleer</Button>
				</DashboardFooterButtonContainer>

			</Modal>}
			<Button onClick={goBack} color="color_error" variant="colored" width="fixed">Terug</Button>
			<Button color="unilever_blue" variant="colored" width="fixed" pushLeft onClick={goToRoute("advices")}>Adviezen</Button>
			<Button color="unilever_blue" variant="colored" width="auto" pushLeft onClick={goToCategoryRoute("")}>Dashboards</Button>
			<Button color="color_good" variant="colored" disabled={priceCheck === "wait"} width="auto" pushLeft onClick={download}>
				{priceCheck === "wait" ? "Laden..." : "Alles downloaden"}
			</Button>


			<Grower grow={1} />
			<Button color="unilever_blue" variant="text" onClick={selectAll(true)}>Alles Selecteren</Button>
			<Button color="unilever_blue" variant="text" onClick={selectAll(false)}>Alles Deselecteren</Button>
			<Button color="unilever_blue" disabled={priceCheck === "wait"} variant="colored" width="auto" pushLeft onClick={save}>
				{priceCheck === "wait" ? "Laden..." : priceCheck ? "Adviesprijzen overschrijven" : "Adviesprijzen opslaan"}
			</Button>
			<Button color="color_good" variant="colored" width="auto" pushLeft onClick={grabAllAdvice}>Toevoegen aan advies</Button>
		</>
	);
};

export default PlanDashboardButtons;
