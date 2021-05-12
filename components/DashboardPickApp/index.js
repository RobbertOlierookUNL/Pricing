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



const DashboardPickApp = () => {
	return (
		<Background image={candyPinkBackgrund}>
			<Sider title="Pricing Tool"/>
			<View>
				<PickCardLayout type="141">
					<PickCard type="first" title="Planning" image={plan} route="schedule" total={17}/>
					<PickCard title="Gepland" image={rsv} route="plan"/>
					<PickCard title="Erosie" image={erosie} route="erosion" total={34} alert={6}/>
					<PickCard title="Kansen" image={kansen} route="chances"/>
					<PickCard title="Laagstand" image={low} route="low"/>
					<PickCard type="sixth" title="Adviezen" image={advice} route="advices"/>
				</PickCardLayout>
			</View>
		</Background>
	);
};


export default DashboardPickApp;
