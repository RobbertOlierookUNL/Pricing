import React, {useState, useEffect, useRef} from "react";

const Shadow = ({zIndex = 1, thickness =0.1, trigger = true, softTrigger = false, clickthrough = true, selfAnimate = false, ...props}) => {
	const [triggerState, setTriggerState] = useState(trigger);
	const shadowRef = useRef(null);

	useEffect(() => {
		if (selfAnimate) {
			setTriggerState(false);
			setTimeout(() => {setTriggerState(true);}, 10);
		}
	}, []);
	useEffect(() => {
		setTriggerState(trigger);
	}, [trigger]);

	return (
		<div ref={shadowRef} className="shadow" {...props}>
			<style jsx>{`
        .shadow {
          z-index: ${zIndex};
          position: absolute;
          pointer-events: ${!clickthrough && trigger ? "auto" : "none"};
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          transition: background-color 0.3s ease-in-out;
          background-color: rgba(0, 0, 0, ${triggerState && !softTrigger ? thickness : 0 });
        }
      `}
			</style>
		</div>
	);
};


export default Shadow;
