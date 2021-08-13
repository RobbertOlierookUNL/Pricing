export const adviceStoreReducer = (state, action) => {
	switch (action.type) {
	case "setConcept":
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
			}
		};
	case "grabAdvice":
		return {...state, tempArr: [], grabAdvice: true};
	case "nextStep":
		return {...state, grabAdvice: false, nextStep: true};
	case "collectConcept":
		return {...state, tempArr: [...state.tempArr, action.value]};
	default:
		throw new Error();
	}
};

//grabAdvice -> collectConcept -> nextStep -> setConcept
