
import {
	getAllDetailedProducts,
	getAllProducts,
	getCategories,
	getCategoryInfo,
	getMeasurements
} from "../../../util/api-functions/queries";
import {
	getCodes,
	getMutationsFromMeasurements
} from "../../../util/api-functions/query-helpers";
import getDateStrings from "../../../util/api-functions/get-date-strings";







const handler = async (req, res) => {
	const {category, interval} = req.query;
	try {

		if (req.method === "GET") {
			const {[interval]: intervalDate, todayString } = getDateStrings();

			console.log(0);
			const categories = await getCategories(category);
			const categoryInfo = await getCategoryInfo(category);
			console.log(1);
			const products = await getAllDetailedProducts(categories, categoryInfo);
			console.log(2);
			const {eans, eanToDescription} = getCodes(products);
			console.log({products, eans});
			console.log(3);
			const measurements = await getMeasurements(eans, {intervalDate, todayString});
			console.log(4);
			const mutations = getMutationsFromMeasurements(measurements, eanToDescription, {intervalDate, todayString}, categoryInfo);

			return res.json(mutations);
		} else {
			res.status(400).json({ message: `Does not support a ${req.method} request` });
		}
	} catch (e) {

		res.status(500).json({ message: e.message});
	}

};

export default handler;
