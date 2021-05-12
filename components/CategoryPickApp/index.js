import React from "react";
import Sider from "../Sider";
import Background from "../Background";
import View from "../View";
import {useRouter} from "next/router";

import PickCardLayout from "../PickCards/PickCardLayout";
import PickCard from "../PickCards/PickCard";

import candyPinkBackgrund from "../../res/candy-pink-background.jpg";
import homecare from "../../res/homecare.jpg";
import food from "../../res/food.jpg";
import personalcare from "../../res/personalcare.jpg";
import refreshment from "../../res/refreshment.jpg";



const CategoryPickApp = () => {
	const Router = useRouter();

	const goToRoute = route => () => {
		Router.push(`/${route}`);
	};

	return (
		<Background image={candyPinkBackgrund}>
			<Sider title="Pricing Tool"/>
			<View>
				<PickCardLayout type="2x2">
					<PickCard title="Foods" image={food} route={goToRoute("food")}/>
					<PickCard title="Refreshments" image={refreshment} route={goToRoute("refr")}/>
					<PickCard title="Home Care" image={homecare} route={goToRoute("hc")}/>
					<PickCard title="Beauty and Personal Care" image={personalcare} route={goToRoute("bpc")}/>
				</PickCardLayout>
			</View>
		</Background>
	);
};


export default CategoryPickApp;
