import "../styles/globals.css";

import React from "react";

import { StoreProvider } from "../lib/Store";
import { adviceStoreReducer, initialState } from "../util/reducers";
import useWindowSize from "../util/useWindowSize";




export function reportWebVitals(metric) {
	console.log(metric);
}


function MyApp({ Component, pageProps }) {

	// const [width, height] = useWindowSize();
	// console.log({width, height});
	// document.body.style.zoom = "100%";


	return (
		<StoreProvider initialState={initialState} reducer={adviceStoreReducer}>
			<Component {...pageProps} />
		</StoreProvider>
	);
}

export default MyApp;
