import {useMemo} from "react";


const useRetailerSorter = (data, priomode) => {
	const myData = useMemo(() => {
		if (data && Array.isArray(data)) {
			const sortOnCapAndPriority = (a, b) => {
				if (a.cap !== b.cap) {
					if (a.cap === "H" || b.cap ==="L") return -1;
					return 1;
				}
				if (b.priority) {
					if (!a.priority) return 1;
					if (b.priority < a.priority) return 1;
				}
				if (!a.priority && !b.priority) {
					if (a.retailer < b.retailer) return -1;
					if (b.retailer < a.retailer) return 1;
					return 0;
				}
				return -1;
			};
			let theData = data.filter(e => !!e.show);
			if (priomode) {
				theData = data.filter(e => !!e.priority);
			}
			const sortedData = theData.sort(sortOnCapAndPriority);
			let caphCount = 0, capoCount = 0 , caplCount = 0;
			sortedData.forEach(item => {
				switch (item.cap) {
				case "H":
					caphCount++;
					break;
				case "O":
					capoCount++;
					break;
				case "L":
					caplCount++;
					break;
				default:
					break;
				}
			});

			return {sortedData, caphCount, capoCount, caplCount};
		}
		else return {sortedData: [], caphCount: 0, capoCount: 0, caplCount: 0};
	}, [data, priomode]);

	return myData;
};

export default useRetailerSorter;
