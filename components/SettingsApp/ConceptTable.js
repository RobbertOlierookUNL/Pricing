import React, {useState, useEffect} from "react";

import { myFetch } from "../../util/functions";
import Button from "../Button";
import useMySnackbar from "../../util/useMySnackbar";






const ConceptTable = ({concepts, loading, cluster, brand}) => {
	const allConcepts = Object.values(concepts).flat();
	const conceptNickname = c => {
		return Object.keys(concepts).find(key => concepts[key]?.some(e => e === c));
	};
	const defaultState = allConcepts.map(e => ({concept: e, nickname: conceptNickname(e) === e ? "" : conceptNickname(e)}));

	const [state, setState] = useState(defaultState);
	const findEntry = (key) => state.findIndex(s => s.concept === key);
	const [openSnackbar] = useMySnackbar();

	useEffect(() => {
	  setState(defaultState);
	}, [brand]);


	const handleChange = key => e => {
		const index = findEntry(key);
		const newState = [...state];
		newState[index].nickname = e.target.value;
		setState(newState);
	};

	const upsertNickname = async (cluster, concept, brand, nickname) => await myFetch("POST", "/api/settings/nickname/modify-concept-nickname", {cluster, concept, brand, nickname});

	const save = async () => {
		for (const e of state) {
			await upsertNickname(cluster, e.concept, brand, e.nickname);
			openSnackbar("opgeslagen");
		}

	};
	return (
		<div className="container">
			{loading && "Loading..."}
			{concepts && allConcepts.map(e => (
				<React.Fragment key={e}>
					<div className="row">{e}</div>
					<input value={state[findEntry(e)]?.nickname} onChange={handleChange(e)}/>
				</React.Fragment>

			))}
			{concepts && <Button onClick={save}>Opslaan</Button>}
			<style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: fit-content;


        }
      `}</style>
		</div>
	);
};



export default ConceptTable;
