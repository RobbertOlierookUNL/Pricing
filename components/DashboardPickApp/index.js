import React from "react";

import { allBrandsText } from "../../lib/config";
import {
	useBrandsFromCategory,
	useCategoriesFromCategory,
	useConceptsFromBrand,
	useDataFromConcept,
	useMutations
} from "../../util/useSwr-hooks";
import Background from "../Background";
import PickCard from "../PickCards/PickCard";
import PickCardLayout from "../PickCards/PickCardLayout";
import Sider from "../Sider";
import View from "../View";
import advice from "../../res/advice.jpg";
import candyPinkBackgrund from "../../res/candy-pink-background.jpg";
import catman from "../../res/catman.jpg";
import settings from "../../res/settings.png";
import updown from "../../res/updown.jpg";
import useCardRouter from "../../util/useCardRouter";
import useCategory from "../../util/useCategory";
import useConfig from "../../util/useConfig";
import usePrefetchCategory from "../../util/usePrefetchCategory";
import usePrefetcher from "../../util/usePrefetcher";







const DashboardPickApp = () => {

	const goToRoute = useCardRouter("category");
	const goToSuperRoute = useCardRouter("");
	const category = useCategory();
	// usePrefetchCategory(category);
	const umfeld = category === "umfeld";


	return (
		<Background image={candyPinkBackgrund}>
			<Sider title="RSP Monitor"/>
			<View>
				<PickCardLayout type={umfeld ? "2x1" : "2x2"}>
					<PickCard title="Marktoverzicht" image={catman} route={goToRoute("overview")}/>
					<PickCard title="Mutaties" image={updown} route={goToRoute("mutations")}/>
					{umfeld ||
						<>
							<PickCard title="Instellingen" image={settings} route={goToRoute("settings")}/>
							<PickCard title="Adviezen" image={advice} route={goToSuperRoute("advices")}/>
						</>
					}
				</PickCardLayout>
			</View>
		</Background>
	);
};


export default DashboardPickApp;
