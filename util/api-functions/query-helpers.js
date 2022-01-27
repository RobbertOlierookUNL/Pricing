import getDateStrings from "./get-date-strings";

import {
	distanceMaker,
	makeRetailSalesPrice,
	propertySetterFillArray
} from "../functions";
import getAdvicePrices from "./get-advice-prices";


export const getNicknameTree = nicknames => {
	const obj = {};
	for (const n of nicknames) {
		propertySetterFillArray(obj, n.concept, false, n.cluster, n.brand, n.nickname);
	}
	return obj;
};
export const getSavedAdvicePricesMap = savedAdvicePrices => {
	const map = {};
	for (const e of savedAdvicePrices) {
		const {ean, adviceH, adviceL} = e;
		map[ean] = {adviceH, adviceL};
	}
	return map;
};

export const getCodesFromDetailedProducts = (detailedProducts, validEans, conceptNicknames, categoryInfo) => {
	const productTableEanSet = new Set();
	const brandSet = new Set();
	const conceptSetByBrand = {};
	const eanToMrdrSet = {};
	const eanToDescription = {};
	const {brand, concept} = categoryInfo;
	for (const product of detailedProducts) {

		const {[brand]: b, [concept]: c, ProductCode: MRDR, ZcuEanCode: eanString} = product;
		const ean = parseInt(eanString);
		if (validEans.some(e => e == ean)) {
			brandSet.add(b);
			conceptSetByBrand[b] ? conceptSetByBrand[b].add(c) : conceptSetByBrand[b] = new Set([c]);
		}
		eanToDescription[ean] = {brand: b, concept: conceptNicknames.find(e => e.concept === c)?.nickname || c};
		eanToMrdrSet[ean] ? eanToMrdrSet[ean].add(MRDR) : eanToMrdrSet[ean] = new Set([MRDR]);
		productTableEanSet.add(ean);
	}
	const brands = [...brandSet];
	Object.entries(conceptSetByBrand).forEach(([key, value]) => {
		const nicknamesMap = {};
		for (const concept of value) {
			let tConcept = concept;
			if (conceptNicknames.some(e => e.concept === concept)) {
				tConcept = conceptNicknames.find(e => e.concept === concept).nickname;
			}
			Array.isArray(nicknamesMap[tConcept]) ? nicknamesMap[tConcept].push(concept) : nicknamesMap[tConcept] = [concept];
		}
		conceptSetByBrand[key] = nicknamesMap;
	});
	const conceptsByBrand = conceptSetByBrand;
	const productTableEans = [...productTableEanSet];
	Object.entries(eanToMrdrSet).forEach(([key, value]) => {
		eanToMrdrSet[key] = [...value];
	});
	const eanToMrdrs = eanToMrdrSet;

	return {brands, conceptsByBrand, productTableEans, eanToMrdrs, eanToDescription };
};

export const getMasterEanMap = (switchIds, eanMap) => {
	const switchIdToCodes = {};
	const switchIdToCap = {};
	const eanToSwitchId = {};
	const masterEans = [];
	const mrdrs = [];
	const eans = [];
	const relinkSwitchIds = {};
	for (const id of switchIds) {
		if (id.SwitchId == "2214" || id.SwitchId == "2131" ) {
			console.log("in for loop");
			console.log(id);
		}
		let wrongSwitchId = false;
		const {SwitchId, ZcuEanCode, MRDR, CAP, timing} = id;
		const ean = parseInt(ZcuEanCode);
		const otherMrdrs = eanMap[ean];
		if (!switchIdToCodes[SwitchId]) {
			if (id.SwitchId == "2214" || id.SwitchId == "2131" ) {
				console.log("initiator");
				console.log(id);
			}
			switchIdToCodes[SwitchId] = {eans: [], mrdrs: []};
		}
		if (id.Active == 1 && MRDR != 0) {
			if (id.SwitchId == "2214" || id.SwitchId == "2131" ) {
				console.log("in active if");
				console.log(id);
			}
			switchIdToCodes[SwitchId].active = ean;
			switchIdToCodes[SwitchId].timing = timing;
			switchIdToCap[SwitchId] = parseFloat(CAP);
			masterEans.push(ean);
			for (const e of [...switchIdToCodes[SwitchId]?.eans, ean]) {
				const possibleOtherSwitchId = eanToSwitchId?.[e] || switchIdToCodes[SwitchId];
				if (id.SwitchId == "2214" || id.SwitchId == "2131" ) {
					console.log(eanToSwitchId);
					console.log({e});
					console.log({possibleOtherSwitchId});
					console.log(id);
				}
				if (possibleOtherSwitchId) {
					const possibleOtherActiveEanTiming = switchIdToCodes[possibleOtherSwitchId]?.timing;
					if (possibleOtherActiveEanTiming) {
						if (possibleOtherActiveEanTiming < timing) { //dit is de goede

							relinkSwitchIds[possibleOtherSwitchId] = SwitchId;
						} else { // die ander was de goede
							relinkSwitchIds[SwitchId] = possibleOtherSwitchId;

							// wrongSwitchId = true;
							// const wrongEans = switchIdToCodes[SwitchId]?.eans;
							// for (const wrongEan of wrongEans) {
							// 	eanToSwitchId[wrongEan] = possibleOtherSwitchId;
							// }
						}
					}
				}
			}

		}

		switchIdToCodes[SwitchId].eans.push(ean);
		switchIdToCodes[SwitchId].mrdrs.push(MRDR);
		if (id.SwitchId == "2214" || id.SwitchId == "2131" ) {
			console.log("set map");
			console.log({ean, SwitchId});
		}
		eanToSwitchId[ean] = SwitchId;
		eans.push(ean);
		mrdrs.push(MRDR);
		if (otherMrdrs) {
			otherMrdrs.forEach(e => {
				mrdrs.push(e);
				switchIdToCodes[SwitchId].mrdrs.push(e);
			});
		}

	}
	console.log({relinkSwitchIds});
	for (const wrongSwitchId in relinkSwitchIds) {
		for (const ean in eanToSwitchId) {
			if (eanToSwitchId[ean] == wrongSwitchId) {
				eanToSwitchId[ean] = relinkSwitchIds[wrongSwitchId];
			}
		}
	}
	return {switchIdToCodes, switchIdToCap, eanToSwitchId, mrdrs, eans, masterEans} ;
};

export const getCodes = products => {
	const eanToMrdrs = {};
	const eanToDescription = {};
	const eans = [];
	for (const entry of products) {
		const ean = parseInt(entry.ZcuEanCode);
		if (eanToMrdrs[ean]) {
			eanToMrdrs[ean].push(entry.ProductCode);
		} else {
			eanToMrdrs[ean] = [entry.ProductCode];
		}
		eanToDescription[ean] = {...entry};
		eans.push(ean);
	}

	// const eans = Object.keys(eanToMrdr);
	// const mrdrs = Object.values(eanToMrdr);
	return {eanToMrdrs, eanToDescription, eans /*, mrdrs*/};
};

export const getCompetitorCodes = competitorInfo => {
	const idToDescription = {};
	for (const entry of competitorInfo) {
		idToDescription[entry.IPV_ID] = {...entry};
	}
	const ids = [...new Set(Object.keys(idToDescription))];
	return {ids, idToDescription};

};

export const getVolumeMap = volumes => {
	const mrdrToVolumeInfo = {};
	for (const entry of volumes) {
		(mrdrToVolumeInfo[parseInt(entry.ESRA_Product)]) || (mrdrToVolumeInfo[parseInt(entry.ESRA_Product)] = {});
		const ref = mrdrToVolumeInfo[parseInt(entry.ESRA_Product)];
		ref[entry.RetailerRSP] = {...entry};
	}
	return mrdrToVolumeInfo;
};

export const getRetailerMap = retailers => {
	const retailerToInfo = {};
	for (const entry of retailers) {
		retailerToInfo[entry.retailer] = {...entry};
	}
	return retailerToInfo;
};

export const dateToInt = dateString => {
	const [y, m, d] = dateString.split("-");
	const n = (parseInt(y)*10000) + (parseInt(m)*100) + (parseInt(d));
	return n;
};

export const fillData = (data, mrdrs, actualRetailers, retailerToInfo, mrdrToVolumeInfo) => {

	const newData = [];
	for (const ret of actualRetailers) {
		//// TODO: Filter gebruiken, meest recente meting selecteren
		const entry = data.find(e => ret === e.retailer);
		if (entry) {
			const all = data.filter(e => ret === e.retailer);
			const recent = all.sort((a, b) => {
				if (dateToInt(a.LastMeasurementDate) < dateToInt(b.LastMeasurementDate)) {
					return 1;
				}
				if (dateToInt(a.LastMeasurementDate) > dateToInt(b.LastMeasurementDate)) {
					return -1;
				}
				return 0;
			})[0];
			newData.push(recent);
		} else {
			const MAT_Volume = calculateAllVolume(mrdrs, mrdrToVolumeInfo, ret);
			newData.push({price: 0, volume: MAT_Volume || 0, ...retailerToInfo[ret]});
		}
	}
	// const seenRetailers = [];
	// for (const entry of newData) {
	// 	if (seenRetailers.some(e => e === entry.retailer)) {
	//
	// 	} else {
	// 		seenRetailers.push(entry.retailer)
	// 	}
	// }
	return newData;
};

export const fillCompetitorData = (data, actualRetailers, retailerToInfo) => {
	const newData = [];
	for (const ret of actualRetailers) {
		//// TODO: Filter gebruiken, meest recente meting selecteren
		const entry = data.find(e => ret === e.retailer);
		if (entry) {
			newData.push(entry);
		} else {
			newData.push({price: 0, volume: 0, ...retailerToInfo[ret]});
		}
	}
	// const seenRetailers = [];
	// for (const entry of newData) {
	// 	if (seenRetailers.some(e => e === entry.retailer)) {
	//
	// 	} else {
	// 		seenRetailers.push(entry.retailer)
	// 	}
	// }
	return newData;
};

export const getNicknamesMap = (concepts, conceptNicknames) => {
	const nicknamesMap = {};
	for (const concept of concepts) {
		let tConcept = concept;
		if (conceptNicknames.some(e => e.concept === concept)) {
			tConcept = conceptNicknames.find(e => e.concept === concept).nickname;
		}
		Array.isArray(nicknamesMap[tConcept]) ? nicknamesMap[tConcept].push(concept) : nicknamesMap[tConcept] = [concept];
	}
	return nicknamesMap;
};

export const calculateAllVolume = (mrdrs, mapping, retailer) => {

	const uniqueMrdrs = [...new Set(mrdrs)];
	let count = 0;
	for (const m of uniqueMrdrs) {
		count += mapping?.[m]?.[retailer]?.MAT_Volume || 0;
	}
	return count;
};

export const getRetailersAndMeasurementsPerEan = (measurements, retailerToInfo, mrdrToVolumeInfo, eanToSwitchId, switchIdToCodes, dateStrings) => {
	console.log("start");
	const measurementsByEan = {};
	const {lastTwoWeekString} = getDateStrings();
	const treshold = dateToInt(lastTwoWeekString);
	const headers = new Set();
	const todayMeasurements = measurements.filter(e => e.priceDate === dateStrings.todayString);
	const findOtherPrice = (eans, retailer, dateString) => measurements.find(
		e =>  (eans.some(ean => ean == e.ProductEAN))
		&& (e.RetailerRSP === retailer)
		&& (e.priceDate === dateString)
	)?.Price || 0;
	let count = 1;

	for (const measurement of todayMeasurements) {

		const {active, mrdrs, eans} = switchIdToCodes[eanToSwitchId[measurement.ProductEAN]];
		count % 100 === 0 && console.log(`${count}/${todayMeasurements.length}: ${active}`);
		count++;
		const LastMeasurementDate = dateToInt(measurement.LastMeasurementDate);
		const valid = LastMeasurementDate > treshold;

		if (active && valid) {

			(measurementsByEan[active]) || (measurementsByEan[active] = {data: []});

			const ref = measurementsByEan[active];
			const retailerInfo = retailerToInfo[measurement.RetailerRSP] || {};

			const MAT_Volume = calculateAllVolume(mrdrs, mrdrToVolumeInfo, measurement.RetailerRSP) * retailerInfo.factorAdvices;

			ref.data.push({
				...measurement,
				...retailerInfo,
				CAP_H: measurement.CAP || 0,
				rsp: measurement.Price || 0,
				volume: MAT_Volume || 0,
				dayRsp: findOtherPrice(eans, measurement.RetailerRSP, dateStrings.yesterdayString),
				twoDayRsp: findOtherPrice(eans, measurement.RetailerRSP, dateStrings.lastTwoDayString),
				fiveDayRsp: findOtherPrice(eans, measurement.RetailerRSP, dateStrings.lastFiveDayString),
				weekRsp: findOtherPrice(eans, measurement.RetailerRSP, dateStrings.lastWeekString),
				twoWeekRsp: findOtherPrice(eans, measurement.RetailerRSP, dateStrings.lastTwoWeekString),
				monthRsp: findOtherPrice(eans, measurement.RetailerRSP, dateStrings.lastMonthString),
				twoMonthRsp: findOtherPrice(eans, measurement.RetailerRSP, dateStrings.lastTwoMonthString),
				ytdRsp:findOtherPrice(eans, measurement.RetailerRSP, dateStrings.firstDayString),
			});
			ref.info = {
				...ref.info,
				cap: ref.info?.cap || measurement.CAP,
				nasa: ref.info?.nasa || measurement.NASA,
				totalVolume: (ref.info?.totalVolume || 0) + (MAT_Volume || 0),
				approxWorth: (ref.info?.approxWorth || 0) + ((MAT_Volume || 0) * (measurement.Price || measurement.CAP || 0)),
				poolCapH: retailerInfo.cap === "H"
					? Array.isArray(ref.info?.poolCapH)
						? [...ref.info?.poolCapH, measurement.Price]
						: [measurement.Price]
					: Array.isArray(ref.info?.poolCapH)
						? ref.info?.poolCapH
						: []
				,
				poolCapL: retailerInfo.cap === "L"
					? Array.isArray(ref.info?.poolCapL)
						? [...ref.info?.poolCapL, measurement.Price]
						: [measurement.Price]
					: Array.isArray(ref.info?.poolCapL)
						? ref.info?.poolCapL
						: [],
				priceSetterPrice: retailerInfo.marketLeader ? measurement.Price : ref.info?.priceSetterPrice,
				ipvDesc: ref.info?.priority != 0 ? measurement.ProductName : ref.info?.ipvDesc ? ref.info?.ipvDesc : measurement.ProductName,
			};
			headers.add(measurement.RetailerRSP);
		}
	}
	return {actualRetailers: headers, measurementsByEan};
};

export const getRetailersAndCompetitorMeasurementsPerId = (measurements, retailerToInfo, dateStrings) => {
	const measurementsById = {};
	const headers = new Set();
	const todayMeasurements = measurements.filter(e => e.priceDate === dateStrings.todayString);
	const findOtherPrice = (MeasurementID, retailer, dateString) => measurements.find(
		e => (e.MeasurementID === MeasurementID)
		&& (e.RetailerRSP === retailer)
		&& (e.priceDate === dateString)
	)?.Price || 0;


	for (const measurement of todayMeasurements) {
		(measurementsById[measurement.MeasurementID]) || (measurementsById[measurement.MeasurementID] = {data: []});
		const ref = measurementsById[measurement.MeasurementID];
		const retailerInfo = retailerToInfo[measurement.RetailerRSP] || {};
		ref.data.push({
			...measurement,
			...retailerInfo,
			CAP_H: measurement.CAP || 0,
			rsp: measurement.Price || 0,
			volume: 0,
			dayRsp: findOtherPrice(measurement.MeasurementID, measurement.RetailerRSP, dateStrings.yesterdayString),
			twoDayRsp: findOtherPrice(measurement.MeasurementID, measurement.RetailerRSP, dateStrings.lastTwoDayString),
			fiveDayRsp: findOtherPrice(measurement.MeasurementID, measurement.RetailerRSP, dateStrings.lastFiveDayString),
			weekRsp: findOtherPrice(measurement.MeasurementID, measurement.RetailerRSP, dateStrings.lastWeekString),
			twoWeekRsp: findOtherPrice(measurement.MeasurementID, measurement.RetailerRSP, dateStrings.lastTwoWeekString),
			monthRsp: findOtherPrice(measurement.MeasurementID, measurement.RetailerRSP, dateStrings.lastMonthString),
			twoMonthRsp: findOtherPrice(measurement.MeasurementID, measurement.RetailerRSP, dateStrings.lastTwoMonthString),
			ytdRsp:findOtherPrice(measurement.MeasurementID, measurement.RetailerRSP, dateStrings.firstDayString),
		});
		ref.info = {
			...ref.info,
			cap: ref.info?.cap || measurement.CAP,
			nasa: ref.info?.nasa || measurement.NASA,
			totalVolume: 0,
			approxWorth: 0,
			poolCapH: retailerInfo.cap === "H"
				? Array.isArray(ref.info?.poolCapH)
					? [...ref.info?.poolCapH, measurement.Price]
					: [measurement.Price]
				: Array.isArray(ref.info?.poolCapH)
					? ref.info?.poolCapH
					: []
			,
			poolCapL: retailerInfo.cap === "L"
				? Array.isArray(ref.info?.poolCapL)
					? [...ref.info?.poolCapL, measurement.Price]
					: [measurement.Price]
				: Array.isArray(ref.info?.poolCapL)
					? ref.info?.poolCapL
					: [],
			priceSetterPrice: retailerInfo.marketLeader ? measurement.Price : ref.info?.priceSetterPrice,
			ipvDesc: ref.info?.ipvDesc || measurement.ProductName,
		};
		headers.add(measurement.RetailerRSP);

	}
	return {actualRetailers: headers, measurementsById};
};


export const getMutationsFromMeasurements = (measurements, eanToDescription, eanToSwitchId, switchIdToCodes, dateStrings, categoryInfo, retailerMap, nicknames) => {
	const {brand, concept} = categoryInfo;

	const todayMeasurements = measurements.filter(e => e.priceDate === dateStrings.todayString);
	const findOtherPrice = (eans, retailer, dateString) => measurements.find(
		e =>  (eans.some(ean => ean == e.ProductEAN))
		&& (e.RetailerRSP === retailer)
		&& (e.priceDate === dateString)
	)?.Price || 0;
	const findNickname = (concept, brand) => {
		return nicknames.find(e => (e.concept === concept) && (e.brand === brand))?.nickname || concept;
	};
	const mutations = [];
	for (const measurement of todayMeasurements) {
		const {Price, ProductEAN, RetailerRSP, ProductName} = measurement;
		const {active, eans} = switchIdToCodes[eanToSwitchId[ProductEAN]];


		const otherPrice = findOtherPrice(eans, RetailerRSP, dateStrings.intervalDate);
		const thisBrand = eanToDescription[active]?.[brand] || eanToDescription[ProductEAN]?.[brand];
		const thisConcept = eanToDescription[active]?.[concept] || eanToDescription[ProductEAN]?.[concept];
		if (active && thisBrand && thisConcept && (Price !== otherPrice)) {
			mutations.push({
				ean: active,
				description: ProductName,
				brand: thisBrand,
				concept: findNickname(thisConcept, thisBrand),
				retailer: RetailerRSP,
				priority: !!retailerMap[RetailerRSP].priority,
				oldPrice: otherPrice,
				newPrice: Price,
				oldDay: dateStrings.intervalDate,
				newDay: dateStrings.todayString
			});
		}
	}
	return mutations;
};

export const getMutationsFromCompetitorMeasurements = (measurements, idToDescription, dateStrings, retailerMap) => {
	const todayMeasurements = measurements.filter(e => e.priceDate === dateStrings.todayString);
	const findOtherPrice = (MeasurementID, retailer, dateString) => measurements.find(
		e => (e.MeasurementID === MeasurementID)
		&& (e.RetailerRSP === retailer)
		&& (e.priceDate === dateString)
	)?.Price || 0;
	const mutations = [];
	for (const measurement of todayMeasurements) {
		const {Price, MeasurementID, ProductEAN, RetailerRSP, ProductName} = measurement;
		const otherPrice = findOtherPrice(MeasurementID, RetailerRSP, dateStrings.intervalDate);

		if (Price !== otherPrice) {
			mutations.push({
				ean: ProductEAN || idToDescription[MeasurementID]?.EAN,
				description: ProductName,
				brand: idToDescription[MeasurementID]?.Cluster,
				concept: idToDescription[MeasurementID]?.Small_C,
				retailer: RetailerRSP,
				priority: !!retailerMap[RetailerRSP].priority,
				oldPrice: otherPrice,
				newPrice: Price,
				oldDay: dateStrings.intervalDate,
				newDay: dateStrings.todayString
			});
		}
	}
	return mutations;
};

export const getHeaders = (actualRetailers, retailerToInfo) => {
	return [...actualRetailers]
		.map(e => ({
			...retailerToInfo[e]
		}));
};


export const getBody = (measurementsByEan, switchIdToCodes, switchIdToCap, eanToSwitchId, actualRetailers, retailerToInfo, mrdrToVolumeInfo, savedAdvicePricesMap) => {
	const unSortedBody = [];
	let count = 1;
	let total = Object.keys(measurementsByEan).length;
	for (const [ean, theseMeasurements] of Object.entries(measurementsByEan)) {
		count % 100 === 0 && console.log(count + "/" + total +": " + ean);
		count++;
		const switchId = eanToSwitchId[ean];
		const mrdrs = switchIdToCodes[switchId].mrdrs;
		const cap = switchIdToCap[switchId];
		const {info: {nasa, approxWorth, totalVolume, poolCapH, poolCapL, priceSetterPrice, ipvDesc}, data} = theseMeasurements;
		const prices = fillData(data, mrdrs, actualRetailers, retailerToInfo, mrdrToVolumeInfo);
		const [defaultAdviceHigh, defaultAdviceLow] = getAdvicePrices(poolCapH, poolCapL, cap, priceSetterPrice, savedAdvicePricesMap[ean]);
		unSortedBody.push({
			// Artikelomschrijving: p[categoryInfo.description],
			Artikelomschrijving: ipvDesc,
			CAP_H: makeRetailSalesPrice(cap || 0),
			CAP_L: makeRetailSalesPrice(distanceMaker(cap || 0)),
			EAN_CE: ean,
			NASA: nasa || "",
			approxWorth: approxWorth || 0,
			totalVolume: totalVolume || 0,
			prices,
			priceSetterPrice: priceSetterPrice || 0,
			defaultAdviceLow,
			defaultAdviceHigh,
		});

	}
	const body = unSortedBody.sort((a,b) => b.approxWorth - a.approxWorth);
	return body;
};

export const getFullBody = (measurementsByEan, switchIdToCodes, eanToSwitchId, actualRetailers, retailerToInfo, mrdrToVolumeInfo, eanToDescription, savedAdvicePricesMap) => {
	const unSortedBody = [];
	let count = 1;
	let total = Object.keys(measurementsByEan).length;
	for (const [prean, theseMeasurements] of Object.entries(measurementsByEan)) {
		count % 100 === 0 && console.log(count + "/" + total);
		count++;
		const codes = switchIdToCodes[eanToSwitchId[prean]];
		const ean = codes.active || prean;
		const {brand: b, concept: c} = eanToDescription[ean] || {};
		let brand = b;
		let concept = c;
		if (!brand) {
			for (const e of codes.eans) {
				const {brand: b, concept: c} = eanToDescription[e] || {};
				if (b) {
					brand = b;
					concept = c;
				}
			}
		}
		const {info: {cap, nasa, approxWorth, totalVolume, poolCapH, poolCapL, priceSetterPrice, ipvDesc}, data} = theseMeasurements;
		const prices = fillData(data, codes.mrdrs, actualRetailers, retailerToInfo, mrdrToVolumeInfo);
		const [defaultAdviceHigh, defaultAdviceLow] = getAdvicePrices(poolCapH, poolCapL, cap, priceSetterPrice, savedAdvicePricesMap[ean]);
		unSortedBody.push({
			// Artikelomschrijving: p[categoryInfo.description],
			Artikelomschrijving: ipvDesc,
			CAP_H: makeRetailSalesPrice(cap || 0),
			CAP_L: makeRetailSalesPrice(distanceMaker(cap || 0)),
			EAN_CE: ean,
			NASA: nasa || "",
			approxWorth: approxWorth || 0,
			totalVolume: totalVolume || 0,
			brand: brand || "",
			concept: concept || "",
			priceSetterPrice: priceSetterPrice || 0,
			prices,
			defaultAdviceLow,
			defaultAdviceHigh,
		});

	}
	const body = unSortedBody.sort((a,b) => b.approxWorth - a.approxWorth);
	return body;
};

export const getCompetitorBody = (products, measurementsById, brand, concept, actualRetailers, retailerToInfo) => {
	const unSortedBody = [];
	const usedIds = [];
	const doubleIds = [];

	for (const p of products) {
		const processedIds = usedIds.length + doubleIds.length;
		if (processedIds === (products.length -1)) {
			console.log(`${brand} - ${concept} - #measurements by EAN: ${Object.keys(measurementsById).length} - 100%`);
		}
		const id = parseInt(p.IPV_ID);
		if (!usedIds.some(e => e === id)) {
			usedIds.push(id);
			const theseMeasurements = measurementsById[id];
			const hasMeasurements = !!theseMeasurements;
			if (hasMeasurements) {
				const {info: {cap, nasa, approxWorth, totalVolume, poolCapH, poolCapL, priceSetterPrice, ipvDesc}, data} = theseMeasurements;
				const prices = fillCompetitorData(data, actualRetailers, retailerToInfo);
				const [defaultAdviceHigh, defaultAdviceLow] = getAdvicePrices(poolCapH, poolCapL, cap, priceSetterPrice);
				unSortedBody.push({
				// Artikelomschrijving: p[categoryInfo.description],
					Artikelomschrijving: ipvDesc,
					CAP_H: makeRetailSalesPrice(cap || 0),
					CAP_L: makeRetailSalesPrice(distanceMaker(cap || 0)),
					EAN_CE: p.EAN,
					NASA: nasa || "",
					approxWorth: approxWorth || 0,
					totalVolume: totalVolume || 0,
					prices,
					defaultAdviceLow,
					defaultAdviceHigh,
				});
			}
		} else {
			doubleIds.push(id);
		}
	}
	const body = unSortedBody;
	console.log(`${brand} - ${concept} - #non empty products${body.length}`);
	return body;
};

export const getPotential = (m, cap) => {
	const thisCap = cap || m?.CAP;
	console.log({m, thisCap});
	if (thisCap && m?.Price && (thisCap / m.Price < 2) && (m.Price / thisCap < 2.5)) {
	 	return [(thisCap - m.Price) / thisCap, thisCap - m.Price, thisCap];
	}
	return [false, false, thisCap];
};
