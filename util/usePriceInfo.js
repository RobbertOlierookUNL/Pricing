import NumberFormat from "react-number-format";
import React from "react";

import {
	bottle_green,
	denim_blue,
	sunset_red,
	turmeric_yellow
} from "../lib/colors";
import { isDateBeforeDate, setDecimals } from "./functions";
import EuroFormat from "../components/EuroFormat";
import getDateStrings from "./api-functions/get-date-strings";
import useColorScale from "./useColorScale";
import useConfig from "./useConfig";









const usePriceInfo = () => {
	const [infoMode] = useConfig("infoMode");
	switch (infoMode) {
	case "volume": {
		 const PriceInfo = ({price,selectedForAdvice}) => (
			<>
				<NumberFormat value={price.volume} displayType="text" decimalSeparator="," thousandSeparator="."/>
			</>
		);
		return PriceInfo;
	}
	case "worth": {
		const PriceInfo = ({price, advice, selectedForAdvice}) => (
			<>
				<NumberFormat value={setDecimals(price.rsp * price.volume, 0)} displayType="text" prefix={"€"} decimalSeparator="," thousandSeparator="."/>
			</>
		);
		return PriceInfo;
	}
	case "relativeAdvice": {
		const PriceInfo = ({price, advice, selectedForAdvice}) => {
			const value = setDecimals((((advice - price.rsp) / price.rsp) * 100), 0);
			const getColor = useColorScale(10, 30, true);
			const color = value ? getColor(value) : "inherit";
			const tooHigh = value > 40;
			const isPositive = value > 0;
			return (
				<>
					<div className="override">
						{isPositive && <NumberFormat value={value} displayType="text" decimalSeparator="," thousandSeparator="." suffix="%"/>}
					</div>
					<style jsx>{`
            .override {
              color: ${tooHigh ? "white" : selectedForAdvice ? "inherit" : color};
              background-color: ${tooHigh ? "red" : "inherit"};
              font-weight: bold;
            }
      `}</style>
				</>
			);
		};
		return PriceInfo;
	}
	case "relativePrice": {
		const PriceInfo = ({price, advice, selectedForAdvice}) => {
			const value = setDecimals((((price.rsp - price.CAP_H) / price.CAP_H) * 100), 0) + 100;
			const getColor = useColorScale(90, 100);
			const color = value ? getColor(value) : "inherit";
			return (
				<>
					<div className="override">
						<NumberFormat value={value} displayType="text" decimalSeparator="," thousandSeparator="." suffix="%"/>
					</div>
					<style jsx>{`
            .override {
              color: ${selectedForAdvice ? "inherit" : color};
              font-weight: bold;
            }
      `}</style>
				</>
			);
		};
		return PriceInfo;
	}
	case "adviceWorth": {
		const PriceInfo = ({price, advice, selectedForAdvice}) => {
			const value = setDecimals((((advice - price.rsp) * price.volume)), 0);
			const getColor = useColorScale(2000, 100000);
			const color = value ? getColor(value) : "inherit";
			const isPositive = value > 0;
			return (
				<>
					<div className="override">
						{isPositive && <EuroFormat value={value} decimalScale={0}/>}
					</div>
					<style jsx>{`
            /* .override {
              color: ${selectedForAdvice ? "inherit" : color};
              font-weight: bold;
            } */
      `}</style>
				</>
			);
		};
		return PriceInfo;
	}
	case "lastMeasurement": {
		const PriceInfo = ({price, advice, selectedForAdvice}) => {
			const mDate = price.LastMeasurementDate;
			const {yesterdayString, lastTwoWeekString} = getDateStrings();
			const recent = !isDateBeforeDate(mDate, yesterdayString);
			const fair = isDateBeforeDate(mDate, yesterdayString);
			const oldDate = isDateBeforeDate(mDate, lastTwoWeekString);

			return (
				<>
					<div className="override">
						{mDate}
					</div>
					<style jsx>{`
						.override {
							color: ${recent ? "black" : oldDate ? sunset_red.color : turmeric_yellow.color};
							font-weight: ${recent ? "inherit" : "bold"};
						}
			`}</style>
				</>
			);
		};
		return PriceInfo;
	}
	case "dataSource": {
		const PriceInfo = ({price, advice, selectedForAdvice}) => {
			const source = price.DataSource;

			return (
				<>
					<div className="override">
						{source}
					</div>
					<style jsx>{`
						.override {
							color: ${source === "IPV" ? denim_blue.color : bottle_green.color};
						}
			`}</style>
				</>
			);
		};
		return PriceInfo;
	}

	default: {
		const PriceInfo = () => <></>;
		return PriceInfo;
	}

	}

};

export default usePriceInfo;
