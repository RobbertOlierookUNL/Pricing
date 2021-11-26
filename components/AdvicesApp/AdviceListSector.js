import React from "react";

import { bottle_green } from "../../lib/colors";
import { deleteAdviceCategory } from "../../util/reducers";
import { useStore } from "../../lib/Store";
import AdviceListSubSector from "./AdviceListSubSector";
import CloseButton from "../Button/CloseButton";
import TitleSelector from "./TitleSelector";






const AdviceListSector = ({data, title}) => {
	const [, dispatch] = useStore();
	const deleteThis = () => {
		dispatch(deleteAdviceCategory({
			category: title
		}));
	};
	return (
		<div>
			<div className="sector-title">
				<TitleSelector category={title}/>
				<div className="close-button">
					<CloseButton onClick={deleteThis}/>
				</div>
			</div>
			<div>
				{Object.keys(data).map(ret => <AdviceListSubSector key={ret} title={ret} data={data[ret]} category={title}/>)}
			</div>
			<style jsx>{`
        .sector-title {
          background-color: ${bottle_green.color};
          color: ${bottle_green.text};
          padding: 5px 5px 5px 15px;
          font-weight: bold;
					position: relative;
        }
				.close-button {
					position: absolute;
					right: 0;
					top: 0;
					width: 3ch;
					line-height: 26.67px;
					text-align: center;
				}
      `}</style>
		</div>
	);
};


export default AdviceListSector;
