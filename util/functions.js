
export const saveParse = (toParse, defaultVal = []) => {
	return toParse ? JSON.parse(toParse) : defaultVal;
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

export const lastFourDigits = (string) => {
	const returnString = "000" + string;
	return returnString.slice(-4);
};

export const getIntervalDay = ({y = 0, m = 0, d = 0}) => {
	const today = new Date();
	const day = new Date(today.getFullYear() + y, today.getMonth() + m, today.getDate() + d);
	return day;
};


// const getPoster = (params) => {
//
// }

export const getDateString = day => {
	const f = new Intl.DateTimeFormat("nl").format(day);
	const a = f.split("-");
	const dayString = lastTwoDigits(a[0]);
	const monthString = lastTwoDigits(a[1]);
	const yearString = lastFourDigits(a[2]);
	return `${yearString}-${monthString}-${dayString}`;
};





export const getAvg = (arr) => arr.reduce(function(p,c,i){return p+(c-p)/(i+1);},0);
