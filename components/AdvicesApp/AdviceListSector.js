import React from "react";

import { bottle_green } from "../../lib/colors";
import AdviceListSubSector from "./AdviceListSubSector";



const AdviceListSector = ({data, title}) => {
	return (
		<div>
			<div className="sector-title">
				{title.toUpperCase()}
			</div>
			<div>
				{Object.keys(data).map(ret => <AdviceListSubSector key={ret} title={ret} data={data[ret]}/>)}
			</div>
			<style jsx>{`
        .sector-title {
          background-color: ${bottle_green.color};
          color: ${bottle_green.text};
          padding: 5px 5px 5px 15px;
          font-weight: bold;
        }
      `}</style>
		</div>
	);
};


export default AdviceListSector;
