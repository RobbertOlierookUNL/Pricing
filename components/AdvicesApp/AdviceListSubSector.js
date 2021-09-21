import React from "react";

import { unilever_blue } from "../../lib/colors";
import AdviceListRow from "./AdviceListRow";



const AdviceListSubSector = ({title, data}) => {
	return (
		<div>
			<div className="sub-sector-title">
				{title}
			</div>
			<div>
				{data.map((entry, i) => <AdviceListRow key={i} data={entry}/>)}
			</div>
			<style jsx>{`
        .sub-sector-title {
          background-color: ${unilever_blue.color};
          color: ${unilever_blue.text};
          padding: 3px 3px 3px 15px;
        }
      `}</style>
		</div>
	);
};


export default AdviceListSubSector;
