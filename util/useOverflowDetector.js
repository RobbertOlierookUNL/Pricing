import React from "react";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";



const useOverflowDetector = () => {
	const node = React.useRef();
	const getNode = React.useCallback(myNode => {
		if (myNode !== null) {
			node.current = myNode;
		}
	}, []);

	const [hasOverflow, setHasOverflow] = React.useState(false);

	useIsomorphicLayoutEffect(() => {
		if ((node.current.clientWidth < node.current.scrollWidth) && !hasOverflow) {
			console.log({node});
			setHasOverflow(true);
		} else if ((node.current.clientWidth >= node.current.scrollWidth) && hasOverflow) {
			setHasOverflow(false);
		}

	}, [node.current?.scrollWidth, node.current?.clientWidth]);

	return [getNode, hasOverflow];

};

export default useOverflowDetector;
