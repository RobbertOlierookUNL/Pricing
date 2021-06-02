const unknown = "H";

const retailers = {
	action: {
		full: "Action",
		short: "Action",
		cap: "L",
		cats: unknown,
		su: false,
		online: false,
		offline: true,
	},
	ah: {
		full: "Albert Heijn",
		short: "AH",
		cap: "H",
		cats: ["FDS", "REFR", "HC", "BPC"],
		su: false,
		online: true,
		offline: true,
	},
	amazon: {
		full: "Amazon",
		short: "Amazon",
		cap: unknown,
		cats: unknown,
		su: false,
		online: true,
		offline: false,
	},
	bol: {
		full: "Bol.com",
		short: "Bol",
		cap: unknown,
		cats: unknown,
		su: false,
		online: true,
		offline: false,
	},
	boni: {
		full: "Boni",
		short: "Boni",
		cap: "L",
		cats: ["FDS", "REFR", "HC", "BPC"],
		su: true,
		online: true,
		offline: true,
	},
	Coop: {
		full: "Coop",
		short: "AH",
		cap: "H",
		cats: ["FDS", "REFR", "HC", "BPC"],
		su: true,
		online: true,
		offline: true,
	},
};

export default retailers;
