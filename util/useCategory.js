import { useRouter } from "next/router";

const useCategory = () => {
	const Router = useRouter();
	return Router.query.category;
};

export default useCategory;
