import React, {useContext} from "react";

import { AdviceStore } from "../../pages/_app";
import Background from "../Background";
import PickCard from "../PickCards/PickCard";
import PickCardLayout from "../PickCards/PickCardLayout";
import Sider from "../Sider";
import View from "../View";
import candyPinkBackgrund from "../../res/candy-pink-background.jpg";
import food from "../../res/food.jpg";
import homecare from "../../res/homecare.jpg";
import personalcare from "../../res/personalcare.jpg";
import refreshment from "../../res/refreshment.jpg";
import useCardRouter from "../../util/useCardRouter";



const CategoryPickApp = () => {

	const goToRoute = useCardRouter();


	return (
		<Background image={candyPinkBackgrund}>
			<Sider title="Pricing Tool"/>
			<View>
				<PickCardLayout type="2x2">
					<PickCard title="Foods" image={food} route={goToRoute("fds")}/>
					<PickCard title="Refreshments" image={refreshment} route={goToRoute("rf")}/>
					<PickCard title="Home Care" image={homecare} route={goToRoute("hc")}/>
					<PickCard title="Beauty and Personal Care" image={personalcare} route={goToRoute("bpc")}/>
				</PickCardLayout>
			</View>
		</Background>
	);
};


export default CategoryPickApp;
