
import { getDateStringFromValue } from "../../../lib/config";
import getMutations from "../../../util/api-functions/end-points/get-mutations";

















const handler = async (req, res) => {
	const {category, interval} = req.query;
	const i = getDateStringFromValue(interval);
	console.log({interval, i});
	try {
		if (req.method === "GET") {
			const mutations = await getMutations(category, i);
			return res.json(mutations);
		} else {
			res.status(400).json({ message: `Does not support a ${req.method} request` });
		}
	} catch (e) {
		res.status(500).json({ message: e.message});
	}

};

export default handler;
