import React from "react";

import { bottle_green } from "../../lib/colors";


const SettingsSector = ({title, children}) => {
	return (
		<div>
			<div className="settings-title">
				{title}
			</div>
			<div className="settings-body">
				{children}
			</div>
			<style jsx>{`
        .settings-title {
          background-color: ${bottle_green.color};
          color: ${bottle_green.text};
          padding: 5px 15px;
        }
        .settings-body {
          padding: 15px;
        }
    `}</style>
		</div>
	);
};


export default SettingsSector;
