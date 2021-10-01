import React from "react";

import {bottle_green} from "../../../lib/colors";
import List from "./List";
import useCategory from "../../../util/useCategory";
import useConfig from "../../../util/useConfig";


const ConceptSider = ({brands, concepts}) => {
	// const [activeConcept, setActiveConcept] = useContext(ActiveConcept);
	// const [activeBrand, setActiveBrand] = useContext(ActiveBrand);
	const category = useCategory();
	const [activeBrand, setActiveBrand] = useConfig("lastActiveBrand-"+category);
	const [activeConcept, setActiveConcept] = useConfig("lastActiveConcept-"+category+activeBrand);

	const handleClickConcept = (item) => () => setActiveConcept(item);
	const handleClickBrand = (item) => () => setActiveBrand(item);

 	const conceptSetter = () => setActiveConcept(concepts?.[0]);
	const brandSetter = () => setActiveBrand(brands?.[0]);

	return (
		<>
			<div className="sider unl-blue shadow">
				<div className="absolute-center container">
					{<List items={brands} activeItem={activeBrand} handleClick={handleClickBrand} setter={brandSetter} size="s"/>}
					{<List items={concepts} activeItem={activeConcept} handleClick={handleClickConcept} setter={conceptSetter} size="m"/>}
				</div>

			</div>
			<style jsx>{`
			.sider {
				width: 400px;
				height: 100vh;
				position: fixed;
				overflow: auto;
				right: -300px;
				top: 0;
				transition: right 250ms linear;
				/* box-shadow: -1px 0px 9px 0px rgb(0 0 0 / 50%); */
			}
			.sider:hover {
				right: 0;
			}
			.sider::before {
				content: "";
				position: absolute;
				background-color: ${bottle_green.color};
				right: 0;
				top: 0;
				height: 100%;
				width: 220px;
			}
			.container {
				width: 100%;
				display: inline-flex;
				align-items: center;
				justify-content: space-around;

			}
		`}</style>
		</>
	);
};


export default ConceptSider;
