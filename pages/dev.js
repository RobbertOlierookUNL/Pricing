import React from "react";
import InfoCard from "../components/dashboards/subcomponents/Table/InfoCard";

const DevContainer = ({children}) => {
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
		<InfoCard info={{Artikelomschrijving: "Calv? Pindakaas Reep Naturel 4 x 35G 6x REL2021",
			CAP_H: 2.99,
			CAP_L: 2.84,
			EAN_CE: "8710522950302"}}/>
	</DevContainer>
);

export default Dev;
