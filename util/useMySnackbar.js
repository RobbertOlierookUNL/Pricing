import { bottle_green, sunset_red } from "../lib/colors";
import { useSnackbar } from "react-simple-snackbar";


const useMySnackbar = () => {
	const goodOptions = {
		style: {
			backgroundColor: bottle_green.color,
			textAlign: "center",
			boxShadow: "5px 5px 50px solid black"
		},
	};
	const errorOptions = {
		style: {
			backgroundColor: sunset_red.color,
			textAlign: "center",
		},
	};
	const [openSnackbar] = useSnackbar(goodOptions);
	const [openErrorSnackbar] = useSnackbar(errorOptions);

	return [openSnackbar, openErrorSnackbar];
};

export default useMySnackbar;
