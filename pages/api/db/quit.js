import { db } from "../../../lib/db";

export default (req, res) => {
	db.quit();
	console.log("quitted I guess");
};
