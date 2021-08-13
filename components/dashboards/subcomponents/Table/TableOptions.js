import React, {useContext} from "react";
import { RetailerMode } from "../../../../pages/[category]/plan";
import {ballet_pink} from "../../../../lib/colors";


const TableOptions = () => {
	const [retailerMode, setRetailerMode] = useContext(RetailerMode);
	const toggleRetailerMode = () => {
		setRetailerMode(!retailerMode);
	};
	return (
		<div onClick={toggleRetailerMode}>
      klik
			<style jsx>{`
      position: sticky;
      left: 0;
      background-color: ${ballet_pink.color};
      color: ${ballet_pink.text};
    `}</style>
		</div>
	);
};



export default TableOptions;
