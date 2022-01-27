export const revalidate = 200;
export const categories = ["hc", "fds", "bpc", "rf", "umfeld"];
export const fallback = true;

export const typesOfAdvice = [
	{
		value: "saved",
		string: "Opgeslagen prijzen"
	},
	{
		value: "cap",
		string: "CAP"
	},
	{
		value: "pushAdvice",
		string: "CAP (max +10%)"
	},
	{
		value: "pushBlind",
		string: "+10%"
	},
	{
		value: "highBased",
		string: "Hoogste hoog"
	},
	{
		value: "lowBased",
		string: "Hoogste laag"
	},
	{
		value: "pricesetter",
		string: "Marktleider"
	},
	{
		value: "directOpportunities",
		string: "Directe kansen",
	},
	{
		value: "opportune",
		string: "Opportuun"
	},
];

export const typesOfInterval = [
	{
		value: "dayRsp",
		string: "Daginterval",
		dateString: "yesterdayString",
	},
	{
		value: "twoDayRsp",
		string: "2 dagen",
		dateString: "lastTwoDayString",
	},
	{
		value: "fiveDayRsp",
		string: "5 dagen",
		dateString: "lastFiveDayString",
	},
	{
		value: "weekRsp",
		string: "Weekinterval",
		dateString: "lastWeekString",
	},
	{
		value: "twoWeekRsp",
		string: "2 weken",
		dateString: "lastTwoWeekString",
	},
	{
		value: "monthRsp",
		string: "Maandinterval",
		dateString: "lastMonthString",
	},
	{
		value: "twoMonthRsp",
		string: "2 maanden",
		dateString: "lastTwoMonthString",
	},
	{
		value: "ytdRsp",
		string: "YTD-interval",
		dateString: "firstDayString",
	},
];

export const getDateStringFromValue = (value) => typesOfInterval.find(e => e.value === value).dateString;


export const typesOfInfo = [
	{
		value: "relativePrice",
		string: "CAP H %"
	},
	{
		value: "relativeAdvice",
		string: "Advies %"
	},
	{
		value: "pricesetter",
		string: "Marktleider %"
	},
	{
		value: "volume",
		string: "Volume"
	},
	{
		value: "worth",
		string: "Waarde"
	},
	{
		value: "adviceWorth",
		string: "Margekans"
	},
	{
		value: "lastMeasurement",
		string: "Laatst gemeten"
	},
	{
		value: "dataSource",
		string: "Databron"
	},
];


export const allBrandsText = "ALLE MERKEN";
export const allConceptsFromBrandText = brand => `Alle ${brand}`;
