import React from "react";
import Sider from "../Sider";
import Background from "../Background";
import View from "../View";
import {useRouter} from "next/router";

import Pick2x1Layout from "../PickCards/Pick2x1Layout";
import Pick2x1Card from "../PickCards/Pick2x1Card";

import candyPinkBackgrund from "../../res/candy-pink-background.jpg";
import catman from "../../res/catman.jpg";
import accountmanager from "../../res/accountmanager.jpg";





const RollPickApp = () => {
	const Router = useRouter();

	const goToRoute = route => () => {
		Router.push(`/${Router.query.category}/${route}`);
	};
	return (
		<Background image={candyPinkBackgrund}>
			<Sider title="Pricing Tool"/>
			<View>
				<Pick2x1Layout>
					<Pick2x1Card title="Category Manager" image={catman} route={goToRoute("cat")}/>
					<Pick2x1Card title="Account Manager" image={accountmanager} route={goToRoute("am")}/>
				</Pick2x1Layout>
			</View>
		</Background>
	);
};


export default RollPickApp;
