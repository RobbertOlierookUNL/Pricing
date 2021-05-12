import React from "react";
import Sider from "../Sider";
import Background from "../Background";
import View from "../View";

import CatManPickCardLayout from "./CatManPickCardLayout";
import CatManPickCard from "./CatManPickCard";

import candyPinkBackgrund from "../../res/candy-pink-background.jpg";
import kansen from "../../res/kansen.jpg";
import rsv from "../../res/rsv.jpg";
import low from "../../res/low.png";
import erosie from "../../res/erosie.jpg";



const CategoryManagerApp = () => {
	return (
		<Background image={candyPinkBackgrund}>
			<Sider title="Pricing Tool"/>
			<View>
				<CatManPickCardLayout>
					<CatManPickCard title="RSVs" image={rsv} route="rsv"/>
					<CatManPickCard title="Erosie" image={erosie} route="erosion"/>
					<CatManPickCard title="Kansen" image={kansen} route="chances"/>
					<CatManPickCard title="Onder CAP" image={low} route="low"/>
				</CatManPickCardLayout>
			</View>
		</Background>
	);
};


export default CategoryManagerApp;
