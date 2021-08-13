import React, {useReducer, useState} from "react";

const useGlobalState = (ContextObject, initialValue, reducer) => {
	let GlobalReturn;
	if (reducer) {
		const GlobalStore = ({children}) => {
			const stateArray = useReducer(reducer, initialValue);
			return (
				<ContextObject.Provider value={stateArray}>
					{children}
				</ContextObject.Provider>
			);
		};
		GlobalReturn = GlobalStore;
	} else {
		const GlobalState = ({children}) => {
			const stateArray = useState(initialValue);
			return (
				<ContextObject.Provider value={stateArray}>
					{children}
				</ContextObject.Provider>
			);
		};
		GlobalReturn = GlobalState;

	}
	return GlobalReturn;
};
export default useGlobalState;
