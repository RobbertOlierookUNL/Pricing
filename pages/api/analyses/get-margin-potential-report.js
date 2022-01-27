

import getMarginPotentialReport from
	"../../../util/api-functions/end-points/get-margin-potential-report";

const handler = async (req, res) => {
	const {calibrationDate, concepts, retailers} = req.body;

	try {
		const results = await getMarginPotentialReport(calibrationDate, concepts, retailers);
		console.log({results});
		return res.json(results);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

export default handler;
