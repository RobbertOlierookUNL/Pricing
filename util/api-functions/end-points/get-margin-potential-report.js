import {
	accumelateWeightedAverage,
	getNicknameKey,
	getWeightedAverage,
	isNumeric,
	parseNicknameKey
} from "../../functions";
import {
	calculateAllVolume,
	getMasterEanMap,
	getPotential,
	getVolumeMap
} from "../query-helpers";
import {
	getAllCategories,
	getAllCategoryInfo,
	getMarginReportFactor,
	getMeasurements,
	getRelevantEansFromConcept,
	getSwitchIds,
	getVolumes
} from "../queries";
import getDateStrings from "../get-date-strings";







const getMarginPotentialReport = async (calibrationDate, concepts, retailers) => {
	console.log("hi");
	const allCategoryInfo = await getAllCategoryInfo();
	const allCategories = await getAllCategories();
	const marginFactorMap = await getMarginReportFactor(retailers);
	const { todayString } = getDateStrings();
	const nicknameToEans = {};
	const allKeys = [];
	let productTableEans = new Set();
	console.log({productTableEans});
	let eanMap = {};
	for (const c of concepts) {
		const {data, cluster, brand, nickname} = c;
		const cat = cluster.toLowerCase();
		const {eans, eanToMrdrs} = await getRelevantEansFromConcept(allCategories[cat], brand, data, allCategoryInfo[cat]);
		const key = getNicknameKey(cluster, brand, nickname);
		console.log({key});

		productTableEans = new Set([...productTableEans, ...eans]);
		eanMap = {...eanMap, ...eanToMrdrs};
		allKeys.push(key);

		// const switchIds = await getSwitchIds(e);
		// const {switchIdToCodes, eanToSwitchId, mrdrs, eans} = getMasterEanMap(switchIds, eanToMrdrs);


		nicknameToEans[key] = eans;
	}
	const switchIds = await getSwitchIds([...productTableEans]);
	const {switchIdToCodes, eanToSwitchId, switchIdToCap, mrdrs, eans} = getMasterEanMap(switchIds, eanMap);
	const measurements = await getMeasurements(eans, {calibrationDate, todayString});
	const volumes = await getVolumes(mrdrs);
	const mrdrToVolumeInfo = getVolumeMap(volumes);
	console.log(measurements);

	const potentialPerConcept = [];
	const arrayOfObjects = [];

	for (const key of allKeys) {
		const {cluster, brand, nickname} = parseNicknameKey(key);
		const allKeyPotential = [];
		const nowPotentialPerRetailer = {};
		const thenPotentialPerRetailer = {};
		const growthPotentialPerRetailer = {};
		const potentialPerRetailer = {};

		const switchIds = new Set();
		nicknameToEans[key].forEach(ean => {
			switchIds.add(eanToSwitchId[ean]);
		});
		console.log({switchIds});
		const truePotThen = {};
		const truePotNow = {};
		const trueCap = {};
		for (const id of [...switchIds]) {
			console.log({id});
			if (id) {
				const {mrdrs, eans} = switchIdToCodes[id];
				const cap = switchIdToCap[id];
				for (const retailer of retailers) {
					const volumeFactor = marginFactorMap[retailer];
					console.log({mrdrs, eans, retailer});
					const todayMeasurement = measurements.find(e => ((e.RetailerRSP == retailer) && eans.some(ean => ean == e.ProductEAN) && (e.priceDate == todayString)));
					const calibrationMeasurent = measurements.find(e => ((e.RetailerRSP == retailer) && eans.some(ean => ean == e.ProductEAN) && (e.priceDate == calibrationDate)));
					console.log({todayMeasurement});
					const [potentialNow, trueNow] = getPotential(todayMeasurement, cap);
					console.log({cap});
					// console.log({potentialNow});
					const [potentialThen, trueThen] = getPotential(calibrationMeasurent, cap);
					if (potentialNow !== false && potentialThen !== false && cap) {
						const potentialGrowth = potentialThen ? (potentialThen - potentialNow) / potentialThen : 0;
						const potentialWeight = calculateAllVolume(mrdrs, mrdrToVolumeInfo, retailer) * volumeFactor;
						truePotNow[retailer]
							? truePotNow[retailer] += trueNow * potentialWeight
							: truePotNow[retailer] = trueNow * potentialWeight;
						truePotThen[retailer]
							? truePotThen[retailer] += trueThen * potentialWeight
							: truePotThen[retailer] = trueThen * potentialWeight;
						trueCap[retailer]
							? trueCap[retailer] += cap * potentialWeight
							: trueCap[retailer] = cap * potentialWeight;

						nowPotentialPerRetailer[retailer] = accumelateWeightedAverage(potentialNow, potentialWeight, nowPotentialPerRetailer[retailer]);
						thenPotentialPerRetailer[retailer] = accumelateWeightedAverage(potentialThen, potentialWeight, thenPotentialPerRetailer[retailer]);
						growthPotentialPerRetailer[retailer] = accumelateWeightedAverage(potentialGrowth, potentialWeight, growthPotentialPerRetailer[retailer]);
						allKeyPotential.push({potentialNow, potentialThen, potentialGrowth, potentialWeight });
					}
				}
			}

		}
		// for (const retailer of retailers) {
		//
		// 	const now = getWeightedAverage(nowPotentialPerRetailer[retailer]);
		// 	const then = getWeightedAverage(thenPotentialPerRetailer[retailer]);
		// 	potentialPerRetailer[retailer] = {
		// 		now,
		// 		then,
		// 		growth: then ? (then - now) / then : "-",
		// 		growthOld: getWeightedAverage(growthPotentialPerRetailer[retailer]),
		// 		volume: nowPotentialPerRetailer[retailer]?.totalWeight,
		// 		cluster,
		// 		brand,
		// 		concept: nickname
		//
		// 	};
		// }
		// potentialPerConcept.push(potentialPerRetailer);
		const obj = {cluster, merk: brand, concept: nickname};
		let totalNow = 0;
		let totalThen = 0;
		let trueTotalThen = 0;
		let trueTotalNow = 0;
		for (const retailer of retailers) {
			const totalWeightThen = nowPotentialPerRetailer[retailer]?.totalWeight;
			const weightedValueThen = nowPotentialPerRetailer[retailer]?.totalWeight;
			totalThen = accumelateWeightedAverage(weightedValueThen, totalWeightThen, totalThen);
			const totalWeightNow = nowPotentialPerRetailer[retailer]?.totalWeight;
			const weightedValueNow = nowPotentialPerRetailer[retailer]?.totalWeight;
			totalNow = accumelateWeightedAverage(weightedValueNow, totalWeightNow, totalNow);
			// (isNumeric(	truePotThen[retailer])) && (trueTotalThen += truePotThen[retailer]);
			// (isNumeric(truePotNow[retailer])) && (trueTotalNow += truePotNow[retailer]);
			const now = getWeightedAverage(nowPotentialPerRetailer[retailer]);
			const then = getWeightedAverage(thenPotentialPerRetailer[retailer]);
			const trueNow = truePotNow[retailer];
			const trueThen = truePotThen[retailer];
			const fullCap = trueCap[retailer];
			console.log({fullCap});

			if (trueNow && trueThen) {
				trueTotalNow += trueNow || 0;
				trueTotalThen += trueThen || 0;
			}
			// obj[`rsp/cap ${retailer} ijkpunt`] = trueThen ? 1 - trueThen / fullCap : "-";
			// obj[`rsp/cap ${retailer} nu`] = trueNow ? 1 - trueNow / fullCap : "-";
			// obj[`potentie verwaard ${retailer}`] = (trueNow && trueThen) ? (trueThen - trueNow) / trueThen : "-";
			obj[`€ potentie adhv MAT_volume van ${retailer} op ijkpunt`] = trueThen || "-";
			obj[`€ potentie verwaard ${retailer}`] = (trueNow && trueThen) ? (trueThen - trueNow) : "-";
			obj[`% potentie verwaard ${retailer}`] = (trueNow && trueThen) ? (trueThen - trueNow) / trueThen : "-";

			// obj[`totaal volume ${retailer}`] = nowPotentialPerRetailer[retailer]?.totalWeight || "-";
		}
		const now = getWeightedAverage(totalNow);
		const then = getWeightedAverage(totalThen);
		// obj["rsp/cap totaal ijkpunt"] = then ? 1 - then : "-";
		// obj["rsp/cap totaal nu"] = now ? 1 - now : "-";
		obj["€ potentie adhv MAT_volume van alle retailers op ijkpunt"] = trueTotalThen || "-";
		obj["€ potentie verwaard alle retailers"] = (trueTotalNow && trueTotalThen) ? (trueTotalThen - trueTotalNow) : "-";
		obj["% potentie verwaard alle retailers"] = (trueTotalNow && trueTotalThen) ? (trueTotalThen - trueTotalNow) / trueTotalThen : "-";

		arrayOfObjects.push(obj);
	}
	return arrayOfObjects;

};



export default getMarginPotentialReport;
