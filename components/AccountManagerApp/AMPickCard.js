import React from "react";
import { useRouter } from "next/router";


const AMPickCard = ({image, title, route}) => {
	const Router = useRouter();

	const goToRoute = () => {
		Router.push(`/${Router.query.category}/am/${route}`);
	};

	return (
		<div className="am-pick-card" onClick={goToRoute}>
			<div className="am-pick-card-title">{title}</div>
			<style jsx>{`
        .am-pick-card {
          width: 200px;
          height: 500px;
          border-radius: 3px;
          background: url(${image}) no-repeat center center;
          background-size: cover;
          position: relative;
          filter: grayscale(60%);
          box-shadow: 1px 1px 5px #333;
          transition: filter 400ms, transform 400ms;
          transform: scale(1);
          cursor: pointer;
        }
        .am-pick-card:hover {
          filter: grayscale(0%);
          transform: scale(1.1);
        }
        .am-pick-card-title {
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          text-shadow:
            1px 1px 3px black,
            2px 2px 5px black,
            1px 2px 4px black;
          font-size: 1.85em;

        }
      `}</style>
		</div>
	);
};


export default AMPickCard;
