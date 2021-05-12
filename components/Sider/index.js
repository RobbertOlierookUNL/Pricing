import React from "react";
import SiderTitle from "./SiderTitle";
import UnileverLogo from "../UnileverLogo";


const Sider = ({title}) => {
	return (
		<>
			<div className="sider">
				<SiderTitle title={title}/>
				<UnileverLogo/>
			</div>
			<style jsx>{`
      .sider {
        width: 100px;
        background-color: #1F36C7;
        height: 100vh;
        position: fixed;
      }
    `}</style>
		</>
	);
};



export default Sider;
