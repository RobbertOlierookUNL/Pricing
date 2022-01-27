import React, {useContext} from "react";

import { AdviceStore } from "../../pages/_app";
import { propertySetter } from "../../util/functions";
import Background from "../Background";
import PickCard from "../PickCards/PickCard";
import PickCardLayout from "../PickCards/PickCardLayout";
import Sider from "../Sider";
import View from "../View";
import candyPinkBackground from "../../res/candy-pink-background.jpg";
import food from "../../res/fds2.jpg";
import homecare from "../../res/hc.jpg";
import personalcare from "../../res/bpc.jpg";
import refreshment from "../../res/rf.jpg";
import umfeld from "../../res/umfeld2.png";
import analyses from "../../res/analyses.png";


import useCardRouter from "../../util/useCardRouter";




const CategoryPickApp = () => {

	const goToRoute = useCardRouter();

	const suffice = string => string + "";




	return (
		<Background image={candyPinkBackground}>
			<Sider title="RSP Monitor"/>
			<View>
				<PickCardLayout type="141">
					<PickCard type="first" title="Margepotentie" image={analyses} route={goToRoute(suffice("analyses"))}/>
					<PickCard title="Foods" image={food} route={goToRoute(suffice("fds"))}/>
					<PickCard title="Refreshments" image={refreshment} route={goToRoute(suffice("rf"))}/>
					<PickCard title="Home Care" image={homecare} route={goToRoute(suffice("hc"))}/>
					<PickCard title="Beauty and Personal Care" image={personalcare} route={goToRoute(suffice("bpc"))}/>
					<PickCard type="sixth"title="Competitor Tracking" image={umfeld} route={goToRoute(suffice("umfeld"))}/>
				</PickCardLayout>
			</View>
		</Background>
	);
};


export default CategoryPickApp;
