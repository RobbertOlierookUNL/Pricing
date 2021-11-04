import {useState, useEffect} from "react";

import { distanceMaker, makeRetailSalesPrice } from "./functions";
import useCategory from "./useCategory";
import useConfig from "./useConfig";
import useDidUpdateEffect from "./useDidUpdateEffect";

const useAdvicePrices = (info) => {

	const category = useCategory();
	const [adviceMode] = useConfig("adviceMode");
	const [activeBrand] = useConfig("lastActiveBrand");
	const [activeConcept] = useConfig("lastActiveConcept");
	const [lastAdviceValue, setLastAdviceValue] = useConfig("lastAdviceValue");

	const brand = activeBrand?.[category];
	const concept = activeConcept?.[category]?.[brand];

	const handleSetLastAdviceValue = (value) => setLastAdviceValue(
		{
			...lastAdviceValue,
			[category]: {
				...lastAdviceValue?.[category],
				[brand]: {
					...lastAdviceValue?.[category]?.[brand],
					[concept]: {
						...lastAdviceValue?.[category]?.[brand]?.[concept],
						[info.EAN_CE]: value
					}
				}
			}
		}
	);
	const handleLastAdviceValue = lastAdviceValue?.[category]?.[brand]?.[concept]?.[info.EAN_CE];


	const [adviceHigh, setAdviceHigh] = useState(handleLastAdviceValue?.high || info?.defaultAdviceHigh[adviceMode] || 0);
	const [adviceLow, setAdviceLow] = useState(handleLastAdviceValue?.low || info?.defaultAdviceLow[adviceMode] || 0);


	const handleHighChange = e => {
		setAdviceHigh(e.floatValue);
		setAdviceLow(false);
	};
	const handleLowChange = e => {
		setAdviceLow(e.floatValue);
	};
	const distance = makeRetailSalesPrice(distanceMaker(adviceHigh));

	const currentLow = adviceLow || distance;

	useDidUpdateEffect(() => {
		setAdviceHigh(info.defaultAdviceHigh[adviceMode] || 0);
		setAdviceLow(info.defaultAdviceLow[adviceMode] || 0);
	}, [info?.defaultAdviceLow[adviceMode], info?.defaultAdviceHigh[adviceMode], adviceMode]);

	useEffect(() => {
		handleSetLastAdviceValue({high: adviceHigh, low: currentLow});
	}, [adviceHigh, currentLow]);

	return {adviceHigh, handleHighChange, adviceLow: currentLow, handleLowChange};
};

export default useAdvicePrices;
