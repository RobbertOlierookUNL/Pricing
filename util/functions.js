export const sendMail = async (axios) => {
	try {
		const token = "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";
		const res = await axios.post("https://api.sendgrid.com/v3/mail/send", {
			data: {
				personalizations: [
					{
						to: [
							{
								email: "test@example.com"
							}
						]
					}
				],
				from: {
					"email": "test@example.com"
				},
				subject: "Sending with SendGrid is Fun",
				content: [
					{
						type: "text/plain",
						value: "and easy to do anywhere, even with cURL"
					}
				]
			},
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				"Authorization": "Bearer " + token,
			}
		});
		console.log({res});
	} catch (e) {
		throw Error({e});
	}

};

export const setDecimals = (num, dec) => {
	const factor = Math.pow(10, dec);
	return Math.round(num * factor) / factor;
};

export const calculateMargin = (advice, rsp, volume) => {
	const difference = advice - rsp;
	const margin = difference * volume;
	return margin || "";
};

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

const getIntervalDay = ({y = 0, m = 0, d = 0}) => {
	const today = new Date();
	const day = new Date(today.getFullYear() + y, today.getMonth() + m, today.getDate() + d);
	return day;
};


// const getPoster = (params) => {
//
// }

const getDateString = day => {
	const f = new Intl.DateTimeFormat("nl").format(day);
	const a = f.split("-");
	const dayString = lastTwoDigits(a[0]);
	const monthString = lastTwoDigits(a[1]);
	const yearString = lastTwoDigits(a[2]);
	return "Date_" + dayString + monthString + yearString;
};

export const getDateStrings = () => {
	const todayString = getDateString(getIntervalDay({}));
	const yesterdayString = getDateString(getIntervalDay({d: -1}));
	const lastWeekString = getDateString(getIntervalDay({d: -7}));
	const lastMonthString = getDateString(getIntervalDay({m: -1}));
	const today = new Date();
	const firstDayString = getDateString(new Date(today.getFullYear(), 0, 1));
	return {todayString, yesterdayString, lastWeekString, lastMonthString, firstDayString};
};



export const getAvg = (arr) => arr.reduce(function(p,c,i){return p+(c-p)/(i+1);},0);


export const getAdvicePrices = (poolCapH, poolCapL, capH, capL, priceSetterPrice) => {
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
