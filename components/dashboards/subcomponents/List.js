import React, {useEffect} from "react";

import ListItem from "./ListItem";

const List = ({items, activeItem, handleClick, setter, size="m"}) => {

	useEffect(() => {
		items && setter();
	}, [items]);


	return (
		<div className={`list-${size}`}>
			{Array.isArray(items) && items?.map(item => <ListItem key={item} item={item} activeItem={activeItem} handleClick={handleClick}/>)}
			<style jsx>{`
				.list-s {
					width: 150px;
				}
				.list-m {
					width: 180px;
				}
				.list-l {
					width: 250px;
				}
			`}</style>
		</div>
	);
};

export default List;
