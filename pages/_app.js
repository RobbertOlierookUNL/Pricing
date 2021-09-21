import "../styles/globals.css";

import React from "react";

import { StoreProvider } from "../lib/Store";
import { adviceStoreReducer, initialState } from "../util/reducers";






function MyApp({ Component, pageProps }) {

	return (
		<StoreProvider initialState={initialState} reducer={adviceStoreReducer}>
			<Component {...pageProps} />
		</StoreProvider>
	);
}

export default MyApp;
