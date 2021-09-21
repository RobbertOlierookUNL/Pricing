import React from "react";
import SiderTitle from "./SiderTitle";
import UnileverLogo from "../UnileverLogo";


const Sider = ({title}) => {
	return (
		<>
			<div className="sider unl-blue">
				<SiderTitle title={title}/>
				<UnileverLogo/>
			</div>
			<style jsx>{`
      .sider {
        width: 100px;
        height: 100vh;
        position: fixed;
      }
    `}</style>
		</>
	);
};



export default Sider;
