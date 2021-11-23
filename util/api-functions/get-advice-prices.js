import { distanceMaker, getAvg, makeRetailSalesPrice } from "../functions";

const getAdvicePrices = (poolCapH, poolCapL, capH, priceSetterPrice) => {
	const capL = makeRetailSalesPrice(distanceMaker(capH));

	const defaultAdviceHigh = {};
	const defaultAdviceLow = {};

	const maxLowValue = Math.max(...poolCapL);
	const maxHighValue = Math.max(...poolCapH);

	const directLowOpportunity = poolCapL.sort()[1];
	const directHighOpportunity = poolCapH.sort()[1];

	const poolAllHigh = [...poolCapH, distanceMaker(maxLowValue, true)];
	// const poolAllLow = [...poolCapL, distanceMaker(maxHighValue)];



	defaultAdviceHigh.highBased = Math.min(maxHighValue, capH);
	defaultAdviceLow.highBased = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.highBased));

	defaultAdviceLow.lowBased = Math.min(maxLowValue, capL);
	defaultAdviceHigh.lowBased = makeRetailSalesPrice(distanceMaker(defaultAdviceLow.lowBased, true));

	defaultAdviceHigh.directOpportunities = directHighOpportunity;
	defaultAdviceLow.directOpportunities = directLowOpportunity;

	defaultAdviceHigh.pushAdvice = Math.min(makeRetailSalesPrice((priceSetterPrice || getAvg(poolCapH)) * 1.1), capH);
	defaultAdviceLow.pushAdvice = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.pushAdvice));

	defaultAdviceHigh.pushBlind = makeRetailSalesPrice((priceSetterPrice || getAvg(poolCapH)) * 1.1);
	defaultAdviceLow.pushBlind = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.pushBlind));

	defaultAdviceHigh.pushQ4 = makeRetailSalesPrice(Math.min(((priceSetterPrice || getAvg(poolCapH)) * 1.12), capH * 1.1)) ;
	defaultAdviceLow.pushQ4 = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.pushQ4));

	defaultAdviceHigh.opportune = Math.min(makeRetailSalesPrice(Math.max(...poolAllHigh)), capH);
	defaultAdviceLow.opportune = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.opportune));

	defaultAdviceHigh.pricesetter = priceSetterPrice || getAvg(poolCapH);
	defaultAdviceLow.pricesetter = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.pricesetter));

	defaultAdviceHigh.cap = capH;
	defaultAdviceLow.cap = capL;

	return [defaultAdviceHigh, defaultAdviceLow];
};

export default getAdvicePrices;
