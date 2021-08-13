import React from "react";
import NumberFormat from "react-number-format";
import EuroInput from "./EuroInput";

const EuroFormat = (props) => {
	return <NumberFormat thousandSeparator="." decimalSeparator="," decimalScale={2} fixedDecimalScale displayType="text" prefix="€" customInput={EuroInput} {...props}/>;
};

export default EuroFormat;
