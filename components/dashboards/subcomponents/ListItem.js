import React, {useContext} from "react";
import { ActiveConcept } from "../PlanDashboard";

const ListItem = ({item}) => {
	const [activeConcept, setActiveConcept] = useContext(ActiveConcept);

	const selectNewConcept = () => setActiveConcept(item);

	const thisItemActive = activeConcept === item;

	return (
		<div
			className={`${thisItemActive ? "active text-shadow" : ""}`}
			onClick={selectNewConcept}
		>
			{item}
			<style jsx>{`
				color: #ddd;
				margin: 5px;
				transition: all 200ms;

				.active {
					color: white;
					transform: scale(1.2);
				}
			`}</style>
		</div>
	);
};

export default ListItem;
