export const distanceMaker = (value, inversed = false) => {
	if (inversed) return value / 0.95;
	return value * 0.95;
};

export const makeRetailSalesPrice = (value) => {
	let bigNumber = true;
	if (value < 7) {
		bigNumber = false;
	}
	const floatString = parseFloat(value).toFixed(2);
	const lastDecimal = floatString.slice(-1);
	const secondLastDecimal = floatString.slice(-2, -1);
	const float = parseFloat(floatString);

	const lastDecimalSwitcher = float => {
		switch (lastDecimal) {
		case "0":
			return float - 0.01;
		case "1":
			return float - 0.02;
		case "2":
			return float - 0.03;
		case "3":
			return float + 0.02;
		case "4":
			return float + 0.01;
		case "5":
			return float;
		case "6":
			return float - 0.01;
		case "7":
			return float + 0.02;
		case "8":
			return float + 0.01;
		case "9":
			return float;
		default:
			return float;
		}
	};

	const secondLastDecimalSwitcher = float => {
		const fiver = lastDecimal === "3" || lastDecimal === "4" || lastDecimal === "5" || lastDecimal === "6";
		const niner = lastDecimal === "7" || lastDecimal === "8" || lastDecimal === "9" || lastDecimal === "0" || lastDecimal === "1" || lastDecimal === "2";
		if (secondLastDecimal === "0" && bigNumber) {
			if (niner) {
				return float - 0.1;
			}
			if (fiver) {
				return float - 0.06;
			}
		}
		if (secondLastDecimal === "9" && fiver && bigNumber) {
			return float + 0.04;
		}
		return float;
	};

	return secondLastDecimalSwitcher(lastDecimalSwitcher(float));
};

export const lastTwoDigits = (string) => {
	const returnString = "0" + string;
	return returnString.slice(-2);
};

export const getTodayString = () => {
	const f = new Intl.DateTimeFormat("nl");
	const a = f.formatToParts();
	const dayString = lastTwoDigits(a[0].value);
	const monthString = lastTwoDigits(a[2].value);
	const yearString = lastTwoDigits(a[4].value);
	return "Date_" + dayString + monthString + yearString;

};

export const getAvg = (arr) => arr.reduce(function(p,c,i){return p+(c-p)/(i+1);},0);


export const getAdvicePrices = (poolCapH, poolCapL, capH, capL) => {
	const defaultAdviceHigh = {};
	const defaultAdviceLow = {};

	const maxLowValue = Math.max(...poolCapL);
	const maxHighValue = Math.max(...poolCapH);

	const directLowOpportunity = poolCapL.sort()[1];
	const directHighOpportunity = poolCapH.sort()[1];

	const poolAllHigh = [...poolCapH, distanceMaker(maxLowValue, true)];
	const poolAllLow = [...poolCapL, distanceMaker(maxHighValue)];



	defaultAdviceHigh.highBased = Math.min(maxHighValue, capH);
	defaultAdviceLow.highBased = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.highBased));

	defaultAdviceLow.lowBased = Math.min(maxLowValue, capL);
	defaultAdviceHigh.lowBased = makeRetailSalesPrice(distanceMaker(defaultAdviceLow.lowBased, true));

	defaultAdviceHigh.directOpportunities = directHighOpportunity;
	defaultAdviceLow.directOpportunities = directLowOpportunity;

	defaultAdviceHigh.pushAdvice = Math.min(makeRetailSalesPrice(getAvg(poolCapH) * 1.1), capH);
	defaultAdviceLow.pushAdvice = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.pushAdvice));

	defaultAdviceHigh.opportune = Math.min(makeRetailSalesPrice(Math.max(...poolAllHigh)), capH);
	defaultAdviceLow.opportune = makeRetailSalesPrice(distanceMaker(defaultAdviceHigh.opportune));

	defaultAdviceHigh.cap = capH;
	defaultAdviceLow.cap = capL;

	return [defaultAdviceHigh, defaultAdviceLow];
};
