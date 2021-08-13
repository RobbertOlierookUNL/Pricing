import React from "react";

const ListItem = ({item, activeItem, handleClick}) => {


	const thisItemActive = activeItem === item;

	return (
		<div
			className={`${thisItemActive ? "active text-shadow" : ""}`}
			onClick={handleClick(item)}
		>
			{item}
			<style jsx>{`
				color: #eee;
				margin: 5px;
				transition: all 200ms;
				cursor: pointer;

				:hover {
					transform: scale(1.1);
				}
				.active {
					color: white;
					transform: scale(1.2);
				}
			`}</style>
		</div>
	);
};

export default ListItem;
