


import createExcelFromArrayOfObjects from
	"../../../util/api-functions/create-excel-from-array-of-objects";

export default async function (req, res) {
	const { aoo } = req.body;
	console.log({aoo});
	const excelBuffer = createExcelFromArrayOfObjects(aoo);
	const buffer = excelBuffer.toString("base64");
	console.log({buffer});
	return res.json({buffer});

}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "5mb",
		},
	},
};
