import React, {useEffect, useContext} from "react";
import { ActiveConcept } from "../PlanDashboard";

import ListItem from "./ListItem";

const List = ({items}) => {
	const [, setActiveConcept] = useContext(ActiveConcept);

	useEffect(() => {
		setActiveConcept(items[0]);
	}, []);

	return (
		<div className="absolute-center">
			{items.map(item => <ListItem key={item} item={item}/>)}
		</div>
	);
};

export default List;
