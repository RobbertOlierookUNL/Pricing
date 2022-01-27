import React from "react";
import NumberFormat from "react-number-format";

import { bottle_green } from "../../../lib/colors";


const DateSelector = ({title, value, update}) => {
	return (
		<>
			<div className="title">
				{title}
			</div>
			<div className="date">
				<span className="desc">Voer een maand (YYYY-MM) in: </span><NumberFormat style={{width: "12ch", textAlign: "center"}} value={value} onChange={update} format={"####-##"} allowEmptyFormatting/>
			</div>
			<style jsx>{`
				.title {
					background-color: ${bottle_green.color};
					color: ${bottle_green.text};
					padding: 5px 15px;
				}
				.desc {
					color: white;
					font-weight: bold;
					padding: 15px;
					display: inline-block;
				}
			`}</style>
		</>	);
};


export default DateSelector;
