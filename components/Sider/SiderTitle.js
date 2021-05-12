import React from "react";
import { useRouter } from "next/router";

const SiderTitle = ({title}) => {
	const Router = useRouter();
	const goHome = () => Router.push("/");

	return (
		<div onClick={goHome}>
			{title}
			<style jsx>{`
        background-color: #9c44c0;
        background-color: #00b190;
        height: 100px;
        width: 150px;
        margin-top: 100px;
        line-height: 100px;
        text-align: center;
        transform: rotate(270deg) translateY(-25px);
        color: white;
        font-size: 1.2em;
        text-shadow: 0px 0px 5px black;
        cursor: pointer;
      `}</style>
		</div>
	);
};


export default SiderTitle;
