import { distanceMaker, getAvg, makeRetailSalesPrice } from "../functions";

const getAdvicePrices = (poolCapH, poolCapL, capH, priceSetterPrice, savedAdvicePrices) => {
	const capL = makeRetailSalesPrice(distanceMaker(capH));

	const defaultAdviceHigh = {};
	const defaultAdviceLow = {};

	const maxLowValue = Math.max(...poolCapL);
	const maxHighValue = Math.max(...poolCapH);

	const directLowOpportunity = poolCapL.sort()[1];
	const directHighOpportunity = poolCapH.sort()[1];

	const poolAllHigh = [...poolCapH, distanceMaker(maxLowValue, true)];
	// const poolAllLow = [...poolCapL, distanceMaker(maxHighValue)];



	defaultAdviceHigh.highBased = Math.min(maxHighValue, capH) || 0;
	defaultAdviceLow.highBased = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.highBased)) || 0;

	defaultAdviceLow.lowBased = Math.min(maxLowValue, capL) || 0;
	defaultAdviceHigh.lowBased = makeRetailSalesPrice(distanceMaker(defaultAdviceLow.lowBased, true)) || 0;

	defaultAdviceHigh.directOpportunities = directHighOpportunity || 0;
	defaultAdviceLow.directOpportunities = directLowOpportunity || 0;

	defaultAdviceHigh.pushAdvice = Math.min(makeRetailSalesPrice((priceSetterPrice || getAvg(poolCapH)) * 1.1), capH) || 0;
	defaultAdviceLow.pushAdvice = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.pushAdvice)) || 0;

	defaultAdviceHigh.pushBlind = makeRetailSalesPrice((priceSetterPrice || getAvg(poolCapH)) * 1.1) || 0;
	defaultAdviceLow.pushBlind = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.pushBlind)) || 0;

	defaultAdviceHigh.pushQ4 = makeRetailSalesPrice(Math.min(((priceSetterPrice || getAvg(poolCapH)) * 1.12), capH * 1.1))  || 0;
	// defaultAdviceLow.pushQ4 = exception || 0;

	defaultAdviceLow.pushQ4 = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.pushQ4)) || 0;

	defaultAdviceHigh.opportune = Math.min(makeRetailSalesPrice(Math.max(...poolAllHigh)), capH) || 0;
	defaultAdviceLow.opportune = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.opportune)) || 0;

	defaultAdviceHigh.pricesetter = priceSetterPrice || getAvg(poolCapH) || 0;
	defaultAdviceLow.pricesetter = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.pricesetter)) || 0;

	defaultAdviceHigh.cap = capH || 0;
	defaultAdviceLow.cap = capL || 0;

	defaultAdviceHigh.saved = savedAdvicePrices?.adviceH || 0;
	defaultAdviceLow.saved = savedAdvicePrices?.adviceL || 0;

	return [defaultAdviceHigh, defaultAdviceLow];
};

export default getAdvicePrices;
