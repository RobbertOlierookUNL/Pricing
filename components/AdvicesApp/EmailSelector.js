import React from "react";

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

	const handleNameChange = e => {
		setInfo({...info, [category]: {...info?.[category], [retailer]: {...info?.[category]?.[retailer], name: e.target.value}}});
	};
	const handleEmailChange = e => {
		setInfo({...info, [category]: {...info?.[category], [retailer]: {...info?.[category]?.[retailer], email: e.target.value}}});
	};

	const {name, email} = info?.[category]?.[retailer] || {};


	return (
		<div>
			<div className="ret">{retailer}</div>
			<div className="name"><i>Name:</i></div>
			<input type="text" value={name || first_name || ""} onChange={handleNameChange}/>
			<span><i>Email:</i></span>
			<input type="text" value={email || kamEmail || ""} onChange={handleEmailChange}/>
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
