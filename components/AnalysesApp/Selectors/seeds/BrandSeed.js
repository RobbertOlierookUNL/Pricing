import React, {useState, useEffect} from "react";

import NicknameSeed from "./NicknameSeed";


const BrandSeed = ({brand, length, data, cluster, dispatch, clusterSelected}) => {
	const [brandSelected, setBrandSelected] = useState(true);
	const toggle = () => {
		setBrandSelected(!brandSelected);
	};
	useEffect(() => {
		setBrandSelected(clusterSelected);
	}, [clusterSelected]);
	return (
		<>
			<div onClick={toggle} className={`brand concept-selector-card ${brandSelected ? "concept-selector-card-selected" : ""}`}  >
				<div className="absolute-center">
					{brand}
				</div>
			</div>
			{Object.keys(data).map(e => (
				<NicknameSeed key={e} cluster={cluster} brand={brand} nickname={e} dispatch={dispatch} brandSelected={brandSelected} data={data[e]}/>
			))}
			<style jsx>{`
        .brand {
          grid-row-end: span ${length};
        }
      `}</style>
		</>
	);
};


export default BrandSeed;
