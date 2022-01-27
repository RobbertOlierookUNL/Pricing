
import { calculateMargin } from "../functions";
import { query } from "../../lib/db";
import createExcel from "./create-excel";
import sendMail from "./send-mail";

const getHasNasa = async () => {
	const nasaRetailers = await query(/* sql */`
		SELECT retailer FROM athena_advicetool_retailers
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



const iterateAdvices = async (transporter, advice, info) => {
	const returnArray = [];
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
			if (transporter) {
				await sendMail(excelBuffer, transporter, info[category], retailer, category.toUpperCase());
			} else {
				returnArray.push({excelBuffer: excelBuffer.toString("base64"), name: `Unilever - Vrijblijvend advies ${info[category]?.week ? `W${info[category]?.week} ` : ""}- ${retailer} - ${info[category]?.title || category}`});
			}
		}
	}
	return returnArray;
};

export default iterateAdvices;
