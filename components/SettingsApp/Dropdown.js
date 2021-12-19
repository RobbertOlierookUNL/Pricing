import React from "react";

const Dropdown = ({value, onChange, options, emptyDefault, emptyIsLoading}) => {
	return (
		<select className="selectBox" value={value} onChange={onChange}>
			{emptyDefault && <option className="selectOption" hidden value={false}>Kies...</option>}
			{Array.isArray(options) && options.map(r => (
				<option className="selectOption" key={r} value={r}>{r}</option>
			))}
			{emptyIsLoading && !options?.length && <option className="selectOption" disabled value={true}>LADEN...</option>}
		</select>
	);
};



export default Dropdown;
