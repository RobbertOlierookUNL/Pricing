




import {
	deleteConceptNickame,
	upsertConceptNickame,
} from "../../../../util/api-functions/queries";

const handler = async (req, res) => {
	const {concept, cluster, brand, nickname} = req.body;
	try {
		console.log({nickname, concept, cluster, brand});
		if (nickname) {
			const results = await upsertConceptNickame(concept, cluster, brand, nickname);
			return res.json(results);
		} else {
			const results = await deleteConceptNickame(concept, cluster, brand);
			return res.json(results);
		}

	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

export default handler;
