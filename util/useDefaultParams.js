import { useRouter } from "next/router";

const useDefaultParams = () => {
	const Router = useRouter();
	return Router.query;
};

export default useDefaultParams;
