import React from "react";


import { ballet_pink } from "../../../../lib/colors";


const SkeletonRows = ({count = 10}) => {
	const fakeData = Array(count).fill(".");

	return (
		<div className="skeleton-container">
			{fakeData.map((dot, i) => <div className="skeleton-row" key={i}><div/></div>)}
			<style jsx>{`
        .skeleton-container {
          background-color: ${ballet_pink.color};
          width: 100%;
          display: inline-grid;
          grid-template-columns: auto;
        }

        .skeleton-row {
          background-color: rgba(255, 255, 255, 0.5);
          transform: translate3d(0px, 0px, 0px);
          position: relative;
          border-radius: 0.25rem;
          height: 42px;
          overflow: hidden;
          margin-bottom: 7px;
          width: 100%;
        }

        .skeleton-row:nth-child(1) {
          background-color: rgba(0, 177, 144, 0.25);
          height: 32px;
          width: calc(100% - 250px);
          left: 250px;
        }

        .skeleton-row:nth-child(2) {
          opacity: 0.9;
        }

        .skeleton-row:nth-child(3) {
          opacity: 0.8;
        }

        .skeleton-row:nth-child(4) {
          opacity: 0.7;
        }

        .skeleton-row:nth-child(5) {
          opacity: 0.6;
        }

        .skeleton-row:nth-child(6) {
          opacity: 0.5;
        }

        .skeleton-row:nth-child(7) {
          opacity: 0.4;
        }

        .skeleton-row:nth-child(8) {
          opacity: 0.3;
        }

        .skeleton-row:nth-child(9) {
          opacity: 0.2;
        }
        .skeleton-row:nth-child(10) {
          opacity: 0.1;
        }



        @keyframes bg-move {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .skeleton-row > div {
          transform: translate3d(0px, 0px, 0px);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(
            to right,
            rgba(31, 54, 199, 0) 0%,
            rgba(31, 54, 199, 0.1) 30%,
            rgba(31, 54, 199, 0.1) 40%,
            rgba(31, 54, 199, 0) 80%
          );
          animation: bg-move 1.5s -0.75s ease infinite;
        }
      `}</style>
		</div>
	);
};



export default SkeletonRows;
