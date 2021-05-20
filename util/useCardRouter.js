import {useRouter} from "next/router";

const useCardRouter = (...queries) => {
	const Router = useRouter();

	const prefix = queries?.map(q => Router.query[q])?.join("/") || "";

	const goToRoute = route => () => {
		Router.push(`${prefix ? `/${prefix}` : ""}/${route}`);
	};
	return goToRoute;
};

export default useCardRouter;
