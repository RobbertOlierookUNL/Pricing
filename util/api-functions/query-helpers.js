export const getCodes = products => {
	const eanToMrdr = {};
	const eanToDescription = {};
	for (const entry of products) {
		eanToMrdr[parseInt(entry.ZcuEanCode)] = entry.ProductCode;
		eanToDescription[parseInt(entry.ZcuEanCode)] = {...entry};
	}
	const eans = [...new Set(Object.keys(eanToMrdr))];
	// const eans = Object.keys(eanToMrdr);
	const mrdrs = Object.values(eanToMrdr);
	return {eanToMrdr, eanToDescription, eans, mrdrs};
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

export const fillData = (data, mrdr, actualRetailers, retailerToInfo, mrdrToVolumeInfo) => {
	const newData = [];
	for (const ret of actualRetailers) {
		//// TODO: Filter gebruiken, meest recente meting selecteren
		const entry = data.find(e => ret === e.retailer);
		if (entry) {
			newData.push(entry);
		} else {
			newData.push({price: 0, volume: mrdrToVolumeInfo?.[mrdr]?.[ret]?.MAT_Volume || 0, ...retailerToInfo[ret]});
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

export const getRetailersAndMeasurementsPerEan = (measurements, retailerToInfo, mrdrToVolumeInfo, eanToMrdr, dateStrings) => {
	const measurementsByEan = {};
	const headers = new Set();
	const todayMeasurements = measurements.filter(e => e.priceDate === dateStrings.todayString);
	const findOtherPrice = (ean, retailer, dateString) => measurements.find(
		e => (e.ProductEAN === ean)
		&& (e.RetailerRSP === retailer)
		&& (e.priceDate === dateString)
	)?.Price || 0;


	for (const measurement of todayMeasurements) {
		(measurementsByEan[measurement.ProductEAN]) || (measurementsByEan[measurement.ProductEAN] = {data: []});
		const ref = measurementsByEan[measurement.ProductEAN];
		const volumeInfo = mrdrToVolumeInfo?.[eanToMrdr?.[measurement.ProductEAN]]?.[measurement.RetailerRSP] || {};
		const retailerInfo = retailerToInfo[measurement.RetailerRSP] || {};
		ref.data.push({
			...measurement,
			...retailerInfo,
			CAP_H: measurement.CAP || 0,
			dayRsp: findOtherPrice(measurement.ProductEAN, measurement.RetailerRSP, dateStrings.yesterdayString),
			fiveDayRsp: findOtherPrice(measurement.ProductEAN, measurement.RetailerRSP, dateStrings.lastFiveDayString),
			monthRsp: findOtherPrice(measurement.ProductEAN, measurement.RetailerRSP, dateStrings.lastMonthString),
			rsp: measurement.Price || 0,
			twoDayRsp: findOtherPrice(measurement.ProductEAN, measurement.RetailerRSP, dateStrings.lastTwoDayString),
			twoMonthRsp: findOtherPrice(measurement.ProductEAN, measurement.RetailerRSP, dateStrings.lastTwoMonthString),
			twoWeekRsp: findOtherPrice(measurement.ProductEAN, measurement.RetailerRSP, dateStrings.lastTwoWeekString),
			volume: volumeInfo.MAT_Volume || 0,
			weekRsp: findOtherPrice(measurement.ProductEAN, measurement.RetailerRSP, dateStrings.lastWeekString),
			ytdRsp:findOtherPrice(measurement.ProductEAN, measurement.RetailerRSP, dateStrings.firstDayString),
		});
		ref.info = {
			...ref.info,
			cap: ref.info?.cap || measurement.CAP,
			nasa: ref.info?.nasa || measurement.NASA,
			totalVolume: (ref.info?.totalVolume || 0) + (volumeInfo.MAT_Volume || 0),
			approxWorth: (ref.info?.approxWorth || 0) + ((volumeInfo.MAT_Volume || 0) * (measurement.Price || 0)),
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
		};
		headers.add(measurement.RetailerRSP);

	}
	return {actualRetailers: headers, measurementsByEan};
};

export const getMutationsFromMeasurements = (measurements, eanToDescription, dateStrings) => {
	const todayMeasurements = measurements.filter(e => e.priceDate === dateStrings.todayString);
	const findOtherPrice = (ean, retailer, dateString) => measurements.find(
		e => (e.ProductEAN === ean)
		&& (e.RetailerRSP === retailer)
		&& (e.priceDate === dateString)
	)?.Price || 0;
	const mutations = [];
	for (const measurement of todayMeasurements) {
		const {Price, ProductEAN, RetailerRSP} = measurement;
		const otherPrice = findOtherPrice(ProductEAN, RetailerRSP, dateStrings.lastWeekString);
		console.log({Price, ProductEAN, RetailerRSP, otherPrice});

		if (Price !== otherPrice) {
			mutations.push({
				ean: ProductEAN,
				description: eanToDescription[ProductEAN],
				retailer: RetailerRSP,
				oldPrice: otherPrice,
				newPrice: Price,
				oldDay: dateStrings.lastWeekString,
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
