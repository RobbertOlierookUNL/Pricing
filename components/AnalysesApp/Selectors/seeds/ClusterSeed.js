import React, {useState} from "react";

import BrandSeed from "./BrandSeed";


const ClusterSeed = ({cluster, length, data, dispatch, brandWidth}) => {
	const [clusterSelected, setClusterSelected] = useState(true);
	const toggle = () => {
		setClusterSelected(!clusterSelected);
	};
	return (
		<>
			<div onClick={toggle} className={`cluster concept-selector-card ${clusterSelected ? "concept-selector-card-selected" : ""}`}  >
				<div className="absolute-center">
					{cluster}
				</div>
			</div>
			{Object.keys(data).map(e => (
				<BrandSeed key={e} brand={e} length={brandWidth[cluster][e]} dispatch={dispatch} data={data[e]} cluster={cluster} clusterSelected={clusterSelected}/>
			))}
			<style jsx>{`
        .cluster {
          grid-row-end: span ${length};

        }
      `}</style>
		</>
	);
};


export default ClusterSeed;
