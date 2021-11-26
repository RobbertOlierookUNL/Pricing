import React, {useEffect} from "react";

import useConfig from "../../util/useConfig";


const TitleSelector = ({category}) => {
	const [info, setInfo] = useConfig("adviceInfo");

	useEffect(() => {
		setInfo({...info, [category]: {...info?.[category], title: category.toUpperCase()}});
	}, [category]);

	const handleTitleChange = e => {
		setInfo({...info, [category]: {...info?.[category], title: e.target.value}});
	};
	const handleWeekChange = e => {
		setInfo({...info, [category]: {...info?.[category], week: e.target.value}});
	};


	const {title, week} = info?.[category] || {};


	return (
		<div>
			<div className="cat">{category.toUpperCase()}</div>
			<div className="title"><i>Title:</i></div>
			<input type="text" value={title} onChange={handleTitleChange}/>
			<span><i>Week:</i></span>
			<input type="number" min="1" max="52" value={week || ""} onChange={handleWeekChange}/>
			<style jsx>{`
				.cat {
					width: 105px;
					display: inline-block;
				}
				.title {
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


export default TitleSelector;
