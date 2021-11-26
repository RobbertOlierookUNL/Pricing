import React from "react";
import Sider from "../Sider";
import Background from "../Background";
import View from "../View";

import PickCardLayout from "../PickCards/PickCardLayout";
import PickCard from "../PickCards/PickCard";

import candyPinkBackgrund from "../../res/candy-pink-background.jpg";
import kansen from "../../res/kansen.jpg";
import rsv from "../../res/rsv.jpg";
import low from "../../res/low.png";
import erosie from "../../res/erosie.jpg";
import advice from "../../res/advice.jpg";
import plan from "../../res/plan.jpg";


import useCardRouter from "../../util/useCardRouter";




const DashboardPickApp = () => {

	const goToRoute = useCardRouter("category");

	const testmail = async () => {
		try {

			const res = await fetch("/api/email/test", {
				method: "PATCH",
				body: JSON.stringify({
					data: "data"
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			});

			const json = await res.json();
			if (!res.ok) throw Error(json.message);

		} catch (e) {
			throw Error(e.message);
		}
	};

	return (
		<Background image={candyPinkBackgrund}>
			<Sider title="RSP Monitor"/>
			<View>
				<PickCardLayout type="141">
					<PickCard type="first" title="Planning" image={plan} route={goToRoute("schedule")} total={17}/>
					<PickCard title="Gepland" image={rsv} route={goToRoute("plan")}/>
					<PickCard title="Erosie" image={erosie} route={goToRoute("erosion")} total={34} alert={6}/>
					<PickCard title="Kansen" image={kansen} route={goToRoute("chances")}/>
					<PickCard title="Laagstand" image={low} route={testmail}/>
					<PickCard type="sixth" title="Adviezen" image={advice} route={goToRoute("advices")}/>
				</PickCardLayout>
			</View>
		</Background>
	);
};


export default DashboardPickApp;
