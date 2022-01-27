import React, {useState, useEffect} from "react";

const NicknameSeed = ({nickname, brand, cluster, data, dispatch, brandSelected}) => {
	const [localState, setLocalState] = useState(true);
	useEffect(() => {
		if (localState) {
			dispatch({type: "add", value: {nickname, brand, cluster, data}});
		} else {
			dispatch({type: "remove", value: {nickname, brand, cluster, data}});
		}
	}, [localState]);
	useEffect(() => {
	  setLocalState(brandSelected);
	}, [brandSelected]);
	const toggle = () => {
		setLocalState(!localState);
	};
	return (
		<>
			<div onClick={toggle} className={`nickname concept-selector-card ${localState ? "concept-selector-card-selected" : ""}`}  >
				{nickname}
			</div>

			<style jsx>{`
        .nickname {
        }
      `}</style>
		</>
	);
};


export default NicknameSeed;
