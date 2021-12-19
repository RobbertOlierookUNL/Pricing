import XLSX from "xlsx-style";
import XLSX1 from "xlsx";

import { excelText } from "../../lib/text";
import { unilever_blue } from "../../lib/colors";




const createExcel = (arrayOfObjects, hasNasaColumn) => {
	// console.log({arrayOfObjects});
	const totalMargin = arrayOfObjects.reduce((acc, val) => {
		acc += val.Marge || 0;
		return acc;
	}, 0);
	const hasMargin = !!totalMargin;
	const nasaCorrection = hasNasaColumn ? 1 : 0;
	const eanColumn = 1;
	const nasaColumn = hasNasaColumn && 2;
	const descriptionColumn = 2 + nasaCorrection;
	const rspColumn = 3 + nasaCorrection;
	const adviceColumn = 4 + nasaCorrection;
	const marginColumn = 5 + nasaCorrection;

	const endColumn = (hasMargin ? 5 : 4) + nasaCorrection;
	const mainCharacters = (hasMargin || hasNasaColumn) ? 14 : 17;
	const descriptionCharacters = (hasMargin || hasNasaColumn) ? 51 : 55;
	const newArrayOfObjects = hasNasaColumn ?
	 [
			{
				offset: "",
				EAN: "EAN",
				NASA: "NASA",
				Productomschrijving: "Productomschrijving",
				RSP: "RSP",
				Adviesprijs: "Adviesprijs",
				Marge: "Marge",
			},
			...arrayOfObjects
		]
		:
		[
			 {
				 offset: "",
				 EAN: "EAN",
				 Productomschrijving: "Productomschrijving",
				 RSP: "RSP",
				 Adviesprijs: "Adviesprijs",
				 Marge: "Marge",
			 },
			 ...arrayOfObjects
		]
	;
	const tl = XLSX1.utils.json_to_sheet(newArrayOfObjects);
	const range = XLSX.utils.decode_range(tl["!ref"]);
	range.s.r = 1;
	range.s.c = 1;
	range.e.c = endColumn;
	const endRow = {...range.e}.r;
	range.e.r += 9;
	const textRow = range.e.r;
	// console.log({range});
	tl["!ref"] = XLSX.utils.encode_range(range);
	tl["!cols"] = hasNasaColumn ?
		[{wch: 2}, {wch: mainCharacters}, {wch: mainCharacters}, {wch: descriptionCharacters}, {wch: mainCharacters}, {wch: mainCharacters}, {wch: mainCharacters}]
		:
		[{wch: 2}, {wch: mainCharacters}, {wch: descriptionCharacters}, {wch: mainCharacters}, {wch: mainCharacters}, {wch: mainCharacters}];

	tl["!merges"] = [{s: {c: 1, r: textRow - 5}, e: {c: endColumn, r: textRow}}];

	const styledTl = {};
	Object.entries(tl).map(([key, value]) => {
		const cell = XLSX.utils.decode_cell(key);
		const col = cell.c;
		const row = cell.r;
		if (col === eanColumn) {
			value = {...value, s: {
				border: {
					left: { style: "thin", color: { auto: 1 } },
				}
			}
			};
		}
		if (col === rspColumn || col === adviceColumn ) {
			value = {...value, z: "€0.00"};
		}
		if (col === marginColumn) {
			value = {...value,
				z: "€#,##0"
			};
		}
		if (col === endColumn) {
			value = {...value, s: {
				border: {
					right: { style: "thin", color: { auto: 1 } },
				}
			},
			};
		}
		if (row === endRow) {
			value = {...value, s: {
				border: {
					...value?.s?.border,
					bottom: { style: "thin", color: { auto: 1 } },
				}
			}
			};
		}
		if (row === 1) {
			value = {...value, s: {
				fill: {
					patternType: "solid",
					fgColor: { rgb: unilever_blue.color.slice(1) },
				},
				font: {
					sz: 16,
					color: { rgb: "FFFFFF" },
					bold: true,
					italic: false,
					underline: false
				},
				border: {
					...value?.s?.border,
					top: { style: "thin", color: { auto: 1 } },
				}
			}
			};
		} else if (col > 0 && row > 0 && row <= endRow) {
			if (row % 2) {
				value = {...value, s: {
					...value?.s,
					fill: {
						patternType: "solid",
						fgColor: { rgb: "DDDDDD" },
					},
				}
				};
			} else {
				value = {...value, s: {
					...value?.s,
					fill: {
						patternType: "solid",
						fgColor: { rgb: "FFFFFF" },
					},
				}

				};
			}
			// console.log({value});

		}

		styledTl[key] = value;
	});
	const textKey = XLSX.utils.encode_cell({c: 1, r: textRow-5});
	const textKey2 = XLSX.utils.encode_cell({c: 1, r: textRow-4});
	const textKey3 = XLSX.utils.encode_cell({c: 1, r: textRow-3});
	const textKey4 = XLSX.utils.encode_cell({c: 1, r: textRow-2});
	const textKey5 = XLSX.utils.encode_cell({c: 1, r: textRow-1});
	const textKey6 = XLSX.utils.encode_cell({c: 1, r: textRow});



	styledTl[textKey] = {
		v: excelText,
		t: "s",
		s: {
			font: {
				sz: 9.5,
			},
			alignment: {
				wrapText: "1",
			},
			border: {
				left: { style: "thick", color: { rgb: unilever_blue.color.slice(1) } },
			},
		}
	};
	styledTl[textKey2] = {
		s: {
			border: {
				left: { style: "thick", color: { rgb: unilever_blue.color.slice(1) } },
			}
		}
	};
	styledTl[textKey3] = {
		s: {
			border: {
				left: { style: "thick", color: { rgb: unilever_blue.color.slice(1) } },
			}
		}
	};
	styledTl[textKey4] = {
		s: {
			border: {
				left: { style: "thick", color: { rgb: unilever_blue.color.slice(1) } },
			}
		}
	};
	styledTl[textKey5] = {
		s: {
			border: {
				left: { style: "thick", color: { rgb: unilever_blue.color.slice(1) } },
			}
		}
	};
	styledTl[textKey6] = {
		s: {
			border: {
				left: { style: "thick", color: { rgb: unilever_blue.color.slice(1) } },
			}
		}
	};

	// console.log({tl});

	const wb = { Sheets: { "Vrijblijvend Advies": styledTl}, SheetNames: ["Vrijblijvend Advies"] };
	const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
	// const blob = new Blob([excelBuffer], {type: fileType});
	return excelBuffer;

};

export default createExcel;
