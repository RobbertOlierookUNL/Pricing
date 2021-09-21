
import { query } from "../../../lib/db";

const calculateDistance = async (cat) => {

	const preresults = await query(/* sql */`
	SELECT CAP_Hoog, Last_measured_RSP, Listed_AH FROM rsp_dashboard_rsp_tijd
	${cat ? "WHERE Cluster = ?" : ""}
`, cat);
	const accumelated = preresults.reduce((acc, val) => {
		const {CAP_Hoog, Last_measured_RSP, Listed_AH} = val;
		const diff = Last_measured_RSP / CAP_Hoog;
		if ((0.5 < diff) && (diff < 2) && Listed_AH != 0) {
			acc.count++;
			acc.accumelated_cap += CAP_Hoog;
			acc.accumelated_rsp += Last_measured_RSP;
		}
		return acc;
	}, {count: 0, accumelated_cap: 0, accumelated_rsp: 0});
	return {[cat || "total"]: {capDistance: Math.round((accumelated.accumelated_rsp / accumelated.accumelated_cap) * 1000)/10, items: accumelated.count}};
};
const handler = async (req, res) => {

	try {

		if (req.method === "GET") {
			const hc = await calculateDistance("HC");
			const pc = await calculateDistance("PC");
			const rf = await calculateDistance("Refreshment");
			const fds1 = await calculateDistance("Mealsol/Oriental");
			const fds2 = await calculateDistance("Meat/Soup");
			const fds3 = await calculateDistance("B&D");
			const total = await calculateDistance();


			return res.json({...hc, ...pc, ...rf, ...fds1, ...fds2, ...fds3, ...total});
		} else {
			res.status(400).json({ message: `Does not support a ${req.method} request` });
		}
	} catch (e) {

		res.status(500).json({ message: e.message});
	}

};

export default handler;
