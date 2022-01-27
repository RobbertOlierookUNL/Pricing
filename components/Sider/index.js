import React from "react";
import SiderTitle from "./SiderTitle";
import UnileverLogo from "../UnileverLogo";


const Sider = ({title, lastRefresh, savePriceCheck}) => {
	const options = lastRefresh && { weekday: "long", month: "long", day: "numeric" };
	const lrString = lastRefresh &&  new Date(lastRefresh.Last_Refresh).toLocaleDateString(undefined, options);
	const lriString =  lastRefresh && new Date(lastRefresh.Last_Refresh_IPV).toLocaleDateString(undefined, options);
	const samesies =  lastRefresh && (lrString === lriString);
	return (
		<>
			<div className="sider unl-blue">
				<SiderTitle title={title}/>
				{lastRefresh &&
					<div className="last-refresh">Refresh gedaan op <br/> {lrString} {!samesies ? `met IPV data van ${lriString}` : ""}</div>

				}
				{savePriceCheck === "wait" &&
				<div className="laden">Laden...</div>
				}
				<UnileverLogo/>
			</div>
			<style jsx>{`
      .sider {
        width: 100px;
        height: 100vh;
        position: fixed;
      }
			.last-refresh {
				color: white;
				width: auto;
				padding: 5px;
				margin: 45px 0 5px;
				background-color: rgba(255,255,255,0.15);
				font-size: 0.5em;
			}
			.laden {
				color: white;
				width: auto;
				text-align: justify;
				padding: 5px;
				background-color: rgba(255,255,255,0.15);
				font-size: 0.5em;
			}
    `}</style>
		</>
	);
};



export default Sider;
