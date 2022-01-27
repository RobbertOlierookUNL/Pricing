import XLSX from "xlsx";



const createExcelFromArrayOfObjects = (arrayOfObjects) => {
	console.log({arrayOfObjects});

	const tl = XLSX.utils.json_to_sheet(arrayOfObjects);


	const wb = { Sheets: { "Sheet1": tl}, SheetNames: ["Sheet1"] };
	const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
	// const blob = new Blob([excelBuffer], {type: fileType});
	return excelBuffer;

};

export default createExcelFromArrayOfObjects;
