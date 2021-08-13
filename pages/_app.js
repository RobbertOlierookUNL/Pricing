import "../styles/globals.css";

import React, {createContext} from "react";

import { adviceStoreReducer } from "../util/reducers";
import useGlobalState from "../util/useGlobalState";


export const AdviceStore = createContext();

function MyApp({ Component, pageProps }) {
	const ProvideAdviceStoreState = useGlobalState(AdviceStore, {grabAdvice: false, advice: {}}, adviceStoreReducer);

	return (
		<ProvideAdviceStoreState>
			<Component {...pageProps} />
		</ProvideAdviceStoreState>
	);
}

export default MyApp;
