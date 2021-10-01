export const SET_CONCEPT = "ADVICE_STORE/SET_CONCEPT";
export const GRAB_ADVICE = "ADVICE_STORE/GRAB_ADVICE";
export const NEXT_STEP = "ADVICE_STORE/NEXT_STEP";
export const COLLECT_CONCEPT = "ADVICE_STORE/COLLECT_CONCEPT";

export const UPDATE_CONFIG = "CONFIG/UPDATE_CONFIG";

const defaultConfig = {
	adviceMode: "opportune",
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


export const adviceStoreReducer = (state, action) => {
	switch (action.type) {
	case SET_CONCEPT:
		return {
			grabAdvice: false,
			nextStep: false,
			advice: {
				...state.advice,
				[action.category]: {
					...state.advice?.[action.category],
					[action.brand]: {
						...state.advice?.[action.category]?.[action.brand],
						[action.concept]: {
							data: state.tempArr
						}
					}
				}
			},
			config: {...state.config}
		};
	case GRAB_ADVICE:
		return {...state, tempArr: [], grabAdvice: true};
	case NEXT_STEP:
		return {...state, grabAdvice: false, nextStep: true};
	case COLLECT_CONCEPT:
		return {...state, tempArr: [...state.tempArr, action.value]};
	case UPDATE_CONFIG:
		return {...state, config: {...state.config, [action.option]: action.value }};
	default:
		throw new Error();
	}
};

//grabAdvice -> collectConcept -> nextStep -> setConcept
