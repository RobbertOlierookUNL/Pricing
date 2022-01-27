import React  from "react";

import { unilever_blue } from "../../../lib/colors";
import CloseButton from "../../Button/CloseButton";
import Shadow from "./Shadow";





const Modal = ({header, children, close, width="300px", height="auto", center=false}) => {

	return (
		<>
			<div className={"modal"}>
				<div className={"header"}>
					<b>{header}</b>
					{close &&
						<div style={{float: "right", cursor: "pointer"}}>
							<CloseButton onClick={close}/>
						</div>
					}
				</div>
				<div className={"body"}>{children}</div>
			</div>
			<Shadow thickness={0.1} selfAnimate clickthrough={false} onClick={close ? close : undefined}/>
			<style jsx>{`
        .modal {
          z-index: 2;
          background-color: white;
          position: absolute;
          width: ${width};
					height: ${height};
          left: 50%;
          top: ${center ? "50%" : "33%"};
          transform: translate(-50%, -50%);
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        }
        .header{
          background-color: ${unilever_blue.color};
          color: ${unilever_blue.text};
          padding: 7px 14px 7px 14px;
        }
        .body {
          padding: 14px;
        }
      `}</style>
		</>
	);
};



export default Modal;
