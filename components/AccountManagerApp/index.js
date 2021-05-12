import React from "react";
import Sider from "../Sider";
import Background from "../Background";
import View from "../View";

import AMPickCardLayout from "./AMPickCardLayout";
import AMPickCard from "./AMPickCard";

import candyPinkBackgrund from "../../res/candy-pink-background.jpg";
import advice from "../../res/advice.jpg";
import plan from "../../res/plan.jpg";





const RollPickApp = () => {
	return (
		<Background image={candyPinkBackgrund}>
			<Sider title="Pricing Tool"/>
			<View>
				<AMPickCardLayout>
					<AMPickCard title="Adviezen" image={advice} route="advices"/>
					<AMPickCard title="Planning" image={plan} route="planning"/>
				</AMPickCardLayout>
			</View>
		</Background>
	);
};


export default RollPickApp;
