import React from "react";

import List from "./List";

const ConceptSider = ({concepts}) => {
	return (
		<>
			<div className="sider unl-blue">
				<List items={concepts}/>
			</div>
			<style jsx>{`
			.sider {
				width: 200px;
				height: 100vh;
				position: fixed;
				right: 0;
				top: 0;
			}
		`}</style>
		</>
	);
};


export default ConceptSider;
