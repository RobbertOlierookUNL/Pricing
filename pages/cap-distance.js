import React from "react";

import { useDistance } from "../util/useSwr-hooks";
import InfoCard from "../components/dashboards/subcomponents/Table/InfoCard";


const DevContainer = ({children}) => {
	const {distance} = useDistance();
	console.log({distance});

	return (
		<div>
			{children}
			<style jsx>{`
      background-color: lightblue;
      width: 250px;
      font-size: 11px;
    `}
			</style>
		</div>
	);};

export const Dev = () => (
	<DevContainer>

	</DevContainer>
);

export default Dev;
