import { db } from "../../../lib/db";

export default (req, res) => {
	db.connect();
	console.log("connected I guess");
};
