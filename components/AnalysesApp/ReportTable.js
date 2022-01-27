import React from "react";

import { getNicknameKey, isNumeric, setDecimals } from "../../util/functions";



const ReportTable = ({report}) => {
	console.log({report});
	return (
		<table>
			<thead>
				<tr>
					{Object.keys(report[0]).map((key) => (
						<th key={key}>{key}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{report.map(row => (
					<tr key={getNicknameKey(row.cluster, row.merk, row.concept)}>{Object.entries(row).map(([key, val]) => (
						<td key={key}>{val === "-" ? "-" : key[0] === "€" ? `€${setDecimals(val, 0)}` : key[0] === "%" ? `${setDecimals(val * 100, 0)}%` : val}</td>
					))}</tr>
				))}
			</tbody>
			<style jsx>{`
				tr {
					background-color: white;

				}
				thead > tr{
					background-color: black;
					color: white;
				}

			`
			}</style>
		</table>
	);
};


export default ReportTable;
