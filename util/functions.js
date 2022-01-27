import * as FileSaver from "file-saver";

export function deepEqual(x, y) {
	const ok = Object.keys, tx = typeof x, ty = typeof y;
	return x && y && tx === "object" && tx === ty ? (
		ok(x).length === ok(y).length &&
      ok(x).every(key => deepEqual(x[key], y[key]))
	) : (x === y);
}

export const saveParse = (toParse, defaultVal = []) => {
	try {
		const parsed = toParse ? JSON.parse(toParse) : defaultVal;
		return parsed;
	} catch (e) {
		return toParse;
	}
};

export const accumelateWeightedAverage = (value, weight, acc) => {
	const {weightedValue, totalWeight} = acc || {weightedValue: 0, totalWeight: 0};
	return {
		weightedValue: weightedValue + value * weight,
		totalWeight: totalWeight + weight
	};
};
export const getWeightedAverage = acc => {
	const {weightedValue, totalWeight} = acc || {weightedValue: 0, totalWeight: 1};
	return weightedValue / totalWeight;
};

export const myFetch = async (method, url, body) => {
	try {
		const res = await fetch(url, {
			method,
			body: JSON.stringify({
				...body
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		});
		const json = await res.json();
		if (!res.ok) throw Error(json.message);
		return json;
	} catch (e) {
		throw Error(e.message);
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

export const calculateVolume = (advice, rsp, margin) => {
	const difference = advice - rsp;
	const volume = difference ? margin / difference : 0;
	return volume || "";
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
	const r = secondLastDecimalSwitcher(lastDecimalSwitcher(float));
	return r < 0 ? 0 : r;
};

export const propertySetter = (object, value, clone, ...nests) => {
	const thisObject = clone ? {...object} : object;
	let ref = thisObject;
	for (const [idx, nest] of nests.entries()) {
		if (idx+1 === nests.length) {
			ref[nest]=value;
		} else if (!ref[nest]) {
			ref[nest]={};
		}
		ref = ref[nest];
	}
	return thisObject;
};

export const propertySetterFillArray = (object, value, clone, ...nests) => {
	const thisObject = clone ? {...object} : object;
	let ref = thisObject;
	for (const [idx, nest] of nests.entries()) {
		if (idx+1 === nests.length) {
			Array.isArray(ref?.[nest])
				?
				ref[nest].push(value)
				:
				ref[nest] = [value];
		} else if (!ref[nest]) {
			ref[nest]={};
		}
		ref = ref[nest];
	}
	return thisObject;
};



function s2ab(s) {
	var buf = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}

export const isDateBeforeDate = (date1, date2) => {
	if (date1&&date2) {
		return new Date(new Date(...date1.split("-")).toDateString()) < new Date(new Date(...date2.split("-")).toDateString());
	}
	return false;
};

export const excelDownloader = (excelBuffer, fileName) => {
	const fileExtension = ".xlsx";
	console.log({excelBuffer, fileName});
	// const blob = new Blob([excelBuffer], {type: fileType});
	var blob = new Blob([s2ab(atob(excelBuffer))], {
		type: ""
	});
	console.log({excelBuffer, fileName, blob});

	FileSaver.saveAs(blob, fileName + fileExtension);
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

export function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

export const getDateString = day => {
	const f = new Intl.DateTimeFormat("nl").format(day);
	const a = f.split("-");
	const dayString = lastTwoDigits(a[0]);
	const monthString = lastTwoDigits(a[1]);
	const yearString = lastFourDigits(a[2]);
	return `${yearString}-${monthString}-${dayString}`;
};


export const getNicknameKey = (cluster, brand, nickname) => [cluster, brand, nickname].join("-");
export const parseNicknameKey = key => {
	const [cluster, brand, nickname] = key.split("-");
	return {cluster, brand, nickname};
};


export const getAvg = (arr) => arr.reduce(function(p,c,i){return p+(c-p)/(i+1);},0);

export const createAooFromServerData = serverData => {
	const aoo = [];
	if (serverData?.body) {
		for (const e of serverData.body) {
			let obj = {
				NASA: e.NASA,
				"Totale waarde": e.approxWorth,
				"Totaal volume": e.totalVolume,
				EAN: e.EAN_CE,
				Merk: e.brand,
				Concept: e.concept,
				Artikelomschrijving: e.Artikelomschrijving,
				"CAP H": e.CAP_H,
				"CAP L": e.CAP_L,
				"Opgeslagen Advies H": e.defaultAdviceHigh?.saved || "-",
				"Opgeslagen Advies L":  e.defaultAdviceLow?.saved || "-",
			};
			for (const p of e.prices) {
				const obj2 = {
					[`${p.retailer} RSP vandaag`]: p.Price,
					[`${p.retailer} RSP gisteren`]: p.dayRsp,
					[`${p.retailer} RSP vorige week`]: p.weekRsp,
					[`${p.retailer} RSP vorige maand`]: p.monthRsp,
					[`${p.retailer} RSP 1 januari`]: p.ytdRsp,
					[`${p.retailer} Laatste meting op`]: p.LastMeasurementDate,
					[`${p.retailer} Volume`]: p.volume,

				};
				obj = {...obj, ...obj2};
			}
			aoo.push(obj);
		}
	}
	return aoo;

};


export const downloadExcelFromAoo = async (aoo, title) => {
	try {
		const body = JSON.stringify({
			aoo
		});

		const res = await fetch("/api/download/get-buffer-from-aoo", {
			method: "POST",
			body,
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		});
		const {buffer} = await res.json();
		excelDownloader(buffer, title);

		if (!res.ok) {
			console.log({res});
			 }

	} catch (e) {
		console.log({e});
	}
};
