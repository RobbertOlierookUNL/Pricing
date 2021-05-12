import React from "react";
import Sider from "../Sider";
import Background from "../Background";
import View from "../View";

import CategoryPickCardLayout from "./CategoryPickCardLayout";
import CategoryPickCard from "./CategoryPickCard";

import candyPinkBackgrund from "../../res/candy-pink-background.jpg";
import homecare from "../../res/homecare.jpg";
import food from "../../res/food.jpg";
import personalcare from "../../res/personalcare.jpg";
import refreshment from "../../res/refreshment.jpg";



const CategoryPickApp = () => {
	return (
		<Background image={candyPinkBackgrund}>
			<Sider title="Pricing Tool"/>
			<View>
				<CategoryPickCardLayout>
					<CategoryPickCard title="Foods" image={food} route="food"/>
					<CategoryPickCard title="Refreshments" image={refreshment} route="refr"/>
					<CategoryPickCard title="Home Care" image={homecare} route="hc"/>
					<CategoryPickCard title="Beauty and Personal Care" image={personalcare} route="bpc"/>
				</CategoryPickCardLayout>
			</View>
		</Background>
	);
};


export default CategoryPickApp;
