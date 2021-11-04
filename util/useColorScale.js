const useColorScale = (min, max, inverse) => value => {
	let newValue = value;
	if (value < min) {
		newValue = min;
	}
	if (value > max) {
		newValue = max;
	}
	newValue = newValue - min;
	const range = max - min;
	const factor = 128 / range;
	newValue = newValue * factor;
	if (inverse) {
		newValue = -1 * (newValue - 128);
	}
	return`hsl(${(newValue)},100%,25%)`;


};


export default useColorScale;
