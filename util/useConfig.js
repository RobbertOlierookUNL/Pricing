import { updateConfig } from "./reducers";
import { useStore } from "../lib/Store";



const useConfig = (specificOption) => {
	const [{config}, dispatch] = useStore();
	if (specificOption) {
		const changeConfig = (value) => dispatch(updateConfig(specificOption, value));
		return [config[specificOption], changeConfig];
	}
	const changeConfig = (option, value) => dispatch(updateConfig(option, value));
	return [config, changeConfig];

};
export default useConfig;
