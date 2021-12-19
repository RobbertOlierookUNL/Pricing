import React from "react";

import { allBrandsText, allConceptsFromBrandText } from "../../../lib/config";
import {bottle_green} from "../../../lib/colors";
import List from "./List";
import useCategory from "../../../util/useCategory";
import useConfig from "../../../util/useConfig";
import useOverflowDetector from "../../../util/useOverflowDetector";




const ConceptSider = ({brands, brandsIsLoading, defaultConcept, defaultBrand, concepts, conceptsIsLoading}) => {
	// const [activeConcept, setActiveConcept] = useContext(ActiveConcept);
	// const [activeBrand, setActiveBrand] = useContext(ActiveBrand);
	const category = useCategory();
	const [activeBrand, setActiveBrand] = useConfig("lastActiveBrand");
	const [activeConcept, setActiveConcept] = useConfig("lastActiveConcept");

	const [conceptOverflowRef, conceptHasOverflow] = useOverflowDetector();
	const [brandOverflowRef, brandHasOverflow] = useOverflowDetector();

	const brand = activeBrand?.[category];
	const concept = activeConcept?.[category]?.[brand];

	const handleSetActiveBrand = value => setActiveBrand({...activeBrand, [category]: value});
	const handleSetActiveConcept = value => setActiveConcept({...activeConcept, [category]: {...activeConcept?.[category], [brand]: value}});

	const handleClickConcept = (item) => () => handleSetActiveConcept(item);
	const handleClickBrand = (item) => () => handleSetActiveBrand(item);

 	const conceptSetter = () => handleSetActiveConcept(defaultConcept);
	const brandSetter = () => handleSetActiveBrand(defaultBrand);

	const brandItems = !brandsIsLoading && Array.isArray(brands) && [allBrandsText, ...brands];
	const conceptItems = brand === allBrandsText ? [allBrandsText] : !conceptsIsLoading && Array.isArray(concepts) && [...new Set([allConceptsFromBrandText(brand), ...concepts])];

	return (
		<>
			<div className="sider shadow">
				<div className="container first-sider unl-blue" ref={brandOverflowRef}>
					{<List items={brandItems} activeItem={brand} handleClick={handleClickBrand} setter={brandSetter} size="s"/>}
				</div>
				<div className="container second-sider" ref={conceptOverflowRef}>

					{<List items={conceptItems} activeItem={concept} handleClick={handleClickConcept} setter={conceptSetter} size="m"/>}

				</div>

			</div>
			<style jsx>{`
			.sider {
				width: 400px;
				height: 100vh;
				position: fixed;
				right: -300px;
				top: 0;
				transition: right 250ms linear;
				/* box-shadow: -1px 0px 9px 0px rgb(0 0 0 / 50%); */
			}
			.sider:hover {
				right: 0;
			}

			.first-sider {
				width: 180px;
				left: 0;
				align-items: ${brandHasOverflow ? "start" : "center"};

			}
			.second-sider {
				background-color: ${bottle_green.color};
				right: 0;
				width: 220px;
				align-items: ${conceptHasOverflow ? "start" : "center"};

			}
			.container {
				height: 100%;
				min-height: min-content;
				position: absolute;
				overflow: auto;
				display: flex;
				justify-content: center;

			}
		`}</style>
		</>
	);
};


export default ConceptSider;
