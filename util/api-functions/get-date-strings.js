import { getDateString, getIntervalDay } from "../functions";

const getDateStrings = () => {
	const todayString = getDateString(getIntervalDay({}));
	const yesterdayString = getDateString(getIntervalDay({d: -1}));
	const lastTwoDayString = getDateString(getIntervalDay({d: -2}));
	const lastFiveDayString = getDateString(getIntervalDay({d: -5}));
	const lastWeekString = getDateString(getIntervalDay({d: -7}));
	const lastTwoWeekString = getDateString(getIntervalDay({d: -14}));
	const lastMonthString = getDateString(getIntervalDay({m: -1}));
	const lastTwoMonthString = getDateString(getIntervalDay({m: -2}));
	const today = new Date();
	const firstDayString = getDateString(new Date(today.getFullYear(), 0, 1));
	return {todayString, yesterdayString, lastTwoDayString, lastFiveDayString, lastWeekString, lastTwoWeekString, lastMonthString, lastTwoMonthString, firstDayString};
};

export default getDateStrings;
