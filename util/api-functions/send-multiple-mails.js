
import { calculateMargin } from "../functions";
import { query } from "../../lib/db";
import createExcel from "./create-excel";
import sendMail from "./send-mail";

const getHasNasa = async () => {
	const nasaRetailers = await query(/* sql */`
		SELECT retailer FROM pricing_tool_retailers
		WHERE nasa = ?
`, 1
	);
	const hasNasa = (ret) => {
		for (const nasaRet of nasaRetailers) {
			if (nasaRet.retailer === ret) {
				return true;
			}
		}
		return false;
	};
	return hasNasa;
};



const sendMultipleMails = async (transporter, advice, info) => {
	console.log({info});
	const hasNasa = await getHasNasa();

	for (const category of  Object.keys(advice)) {

		const retailerMoveUp = Object.values(advice[category]).reduce((acc, val) => {
			for (const retailer of Object.keys(val)) {

				const {ean, nasa, description, rsp, volume, advice} = val[retailer];
				const newObject = hasNasa(retailer) ?
					{
						offset: "",
						EAN: ean,
						NASA: nasa,
						Productomschrijving: description,
						RSP: rsp,
						Adviesprijs: advice,
						Marge: calculateMargin(advice, rsp, volume),
					}
					:
					{
						offset: "",
						EAN: ean,
						Productomschrijving: description,
						RSP: rsp,
						Adviesprijs: advice,
						Marge: calculateMargin(advice, rsp, volume),
					};
				if (Object.prototype.hasOwnProperty.call(acc, retailer)) {
					acc[retailer].push(newObject);
				} else {
					acc[retailer] = [newObject];
				}
			}
			return acc;
		}, {});

		for (const retailer of Object.keys(retailerMoveUp)) {
			const excelBuffer = createExcel(retailerMoveUp[retailer], hasNasa(retailer));
			await sendMail(excelBuffer, transporter, info[category], retailer, category.toUpperCase());
		}
	}
};

export default sendMultipleMails;
