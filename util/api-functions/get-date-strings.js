import { getDateString, getIntervalDay } from "../functions";

const getDateStrings = (td) => {
	const preDay = new Date(td);
	const today = td ? new Date(preDay.getFullYear(), preDay.getMonth(), preDay.getDate()) : new Date();
	let saturday = false;
	let sunday = false;
	if(today.getDay() == 6) {
		saturday = true;
	}
	if(today.getDay() == 0){
		sunday = true;
	}
	const todayString = getDateString(today);
	const yesterdayString = getDateString(getIntervalDay(sunday ? {d: -2} : {d: -1}));
	const lastTwoDayString = getDateString(getIntervalDay({d: -2}));
	const lastFiveDayString = getDateString(getIntervalDay({d: -5}));
	const lastWeekString = getDateString(getIntervalDay({d: -7}));
	const lastTwoWeekString = getDateString(getIntervalDay({d: -14}));
	const lastMonthString = getDateString(getIntervalDay({m: -1}));
	const lastTwoMonthString = getDateString(getIntervalDay({m: -2}));
	const firstDayString = getDateString(new Date(today.getFullYear(), 0, 1));
	return {todayString, yesterdayString, lastTwoDayString, lastFiveDayString, lastWeekString, lastTwoWeekString, lastMonthString, lastTwoMonthString, firstDayString};
};

export default getDateStrings;
