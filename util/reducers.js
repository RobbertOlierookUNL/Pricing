export const SET_CONCEPT = "ADVICE_STORE/SET_CONCEPT";
export const GRAB_ADVICE = "ADVICE_STORE/GRAB_ADVICE";
export const NEXT_STEP = "ADVICE_STORE/NEXT_STEP";
export const COLLECT_CONCEPT = "ADVICE_STORE/COLLECT_CONCEPT";
export const UPDATE_ADVICE = "ADVICE_STORE/UPDATE_ADVICE";
export const DELETE_ADVICE = "ADVICE_STORE/DELETE_ADVICE";
export const DELETE_ADVICE_RETAILER = "ADVICE_STORE/DELETE_ADVICE_RETAILER";
export const DELETE_ADVICE_CATEGORY = "ADVICE_STORE/DELETE_ADVICE_CATEGORY";
export const CLEAR_ADVICE = "ADVICE_STORE/CLEAR_ADVICE";



export const UPDATE_CONFIG = "CONFIG/UPDATE_CONFIG";

const defaultConfig = {
	retailerMode: false,
	deltaMode: false,
	adviceMode: "pushAdvice",
	intervalMode: "weekRsp",
	infoMode: "relativePrice",
	adviceInfo: {},
	lastActiveBrand: {},
	lastActiveConcept: {},
	lastAdviceValue: {},
	prefetch: false
};

export const initialState = {
	grabAdvice: false, advice: {}, config: defaultConfig
};

export const updateConfig = (option, value) => ({
	type: UPDATE_CONFIG,
	option,
	value,
});

export const setConcept = (category, brand, concept) => ({
	type: SET_CONCEPT,
	category,
	brand,
	concept
});

export const grabAdvice = () => ({
	type: GRAB_ADVICE
});

export const nextStep = () => ({
	type: NEXT_STEP
});

export const collectConcept = (value) => ({
	type: COLLECT_CONCEPT,
	value
});

export const updateAdvice = ({property, value, category, brand, concept, ean, retailer}) => ({
	type: UPDATE_ADVICE,
	property,
	value,
	category,
	brand,
	concept,
	ean,
	retailer
});

export const deleteAdvice = ({property, value, category, brand, concept, ean, retailer}) => ({
	type: DELETE_ADVICE,
	property,
	value,
	category,
	brand,
	concept,
	ean,
	retailer
});

export const deleteAdviceRetailerFromCategory = ({category, retailer}) => ({
	type: DELETE_ADVICE_RETAILER,
	category,
	retailer
});

export const deleteAdviceCategory = ({category}) => ({
	type: DELETE_ADVICE_CATEGORY,
	category
});

export const clearAdvice = () => ({
	type: CLEAR_ADVICE
});



export const adviceStoreReducer = (state, action) => {
	switch (action.type) {
	case SET_CONCEPT: {
		const newAdvice =  {
			...state.advice?.[action.category],
		};
		const alreadyEmptied = [];
		if (state.tempArr.length > 0) {
			for (const singleAdvice of state.tempArr) {
				if (!alreadyEmptied.some(e => e === singleAdvice.ean)) {
					newAdvice[singleAdvice.ean] = {};
					alreadyEmptied.push(singleAdvice.ean);
				}
				if (singleAdvice.retailer) {
					newAdvice[singleAdvice.ean][singleAdvice.retailer] = {...singleAdvice, brand: action.brand, concept: action.concept, category: action.category};
				}
			}
		}

		return {
			grabAdvice: false,
			nextStep: false,
			advice: {
				...state.advice,
				[action.category]: newAdvice
			},
			config: {...state.config}
		};
	}
	case GRAB_ADVICE:
		return {...state, tempArr: [], grabAdvice: true};
	case NEXT_STEP:
		return {...state, grabAdvice: false, nextStep: true};
	case COLLECT_CONCEPT:
		if (action.value) {
			return {...state, tempArr: [...state.tempArr, action.value]};
		}
		else return state;
	case UPDATE_ADVICE: {
		const data  = state?.advice?.[action.category];
		const newData = {...data};
		newData[action.ean][action.retailer][action.property] = action.value;

		return {...state, advice: {
			...state.advice,
			[action.category]: newData
		}
		};
	}
	case DELETE_ADVICE: {
		const data  = state?.advice?.[action.category];
		const newData = {...data};
		delete newData[action.ean][action.retailer];

		return {...state, advice: {
			...state.advice,
			[action.category]: newData
		}
		};
	}
	case DELETE_ADVICE_RETAILER: {
		const data  = state?.advice?.[action.category];
		const newData = {...data};
		for (const entry of Object.keys(newData)) {
			delete newData[entry][action.retailer];
			if (Object.keys(newData[entry]).length === 0) {
				delete newData[entry];
			}
		}

		return {...state, advice: {
			...state.advice,
			[action.category]: newData
		}};
	}
	case DELETE_ADVICE_CATEGORY: {
		const newState = {...state, advice: {...state.advice}};
		delete newState.advice[action.category];
		return newState;
	}
	case CLEAR_ADVICE: {
		return {...state, advice: {}};
	}
	case UPDATE_CONFIG:
		return {...state, config: {...state.config, [action.option]: action.value }};
	default:
		throw new Error();
	}
};

//grabAdvice -> collectConcept -> nextStep -> setConcept
