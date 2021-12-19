import React from "react";

import { propertySetter } from "../../util/functions";
import useConfig from "../../util/useConfig";



const EmailSelector = ({category, retailer, data}) => {
	const [info, setInfo] = useConfig("adviceInfo");
	const {
		email: kamEmail,
		sdEmail,
		first_name,
		sdFirstName,
		last_name,
		sdLastName
	} = data.find(e =>
		(e.category === category)
		&&
		(e.retailer === retailer)
	);

	React.useEffect(() => {
		propertySetter(info, first_name, false, category, retailer, "name");
		propertySetter(info, kamEmail, false, category, retailer, "email");
		setInfo(info);
	}, [kamEmail, first_name, category, retailer]);

	const handleNameChange = e => {
		propertySetter(info, e.target.value, false, category, retailer, "name");
		setInfo(info);
	};
	const handleEmailChange = e => {
		propertySetter(info, e.target.value, false, category, retailer, "email");
		setInfo(info);
	};

	const {name, email} = info?.[category]?.[retailer] || {};


	return (
		<div>
			<div className="ret">{retailer}</div>
			<div className="name"><i>Name:</i></div>
			<input type="text" value={name || ""} onChange={handleNameChange}/>
			<span><i>Email:</i></span>
			<input type="text" value={email || ""} onChange={handleEmailChange}/>
			<style jsx>{`
				.ret {
					width: 105px;
					display: inline-block;
				}
				.name {
					display: inline-block;
				}
				input {
					background: rgba(0, 0, 0, 0.1);
					border: 0;
					/* border-bottom: 2px solid white;
					border-left: 2px solid white; */
					color: white;
					margin: 0 15px 0 5px;
				}
			`}</style>

		</div>
	);
};


export default EmailSelector;
