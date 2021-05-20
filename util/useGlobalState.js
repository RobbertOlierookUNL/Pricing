import React, {useState} from "react";

const useGlobalState = (ContextObject, initialValue) => {
	const GlobalState = ({children}) => {
		const stateArray = useState(initialValue);
		return (
			<ContextObject.Provider value={stateArray}>
				{children}
			</ContextObject.Provider>
		);
	};
	return GlobalState;
};
export default useGlobalState;
