
import {
	getBrands,
	getCategoryInfo,
	getCompetitorBrands,
	getValidEans
} from "../../../util/api-functions/queries";
import { saveParse } from "../../../util/functions";





const getAllBrandsFromCategory = async (category, cat) => {

	if (category[0] !== "umfeld") {
		const categoryInfo = await getCategoryInfo(cat);
		const validEans = await getValidEans();
		const brands = await getBrands(category, categoryInfo, validEans);
		return brands;
	} else {
		const brands = await getCompetitorBrands();
		return brands;
	}

};

export default getAllBrandsFromCategory;
