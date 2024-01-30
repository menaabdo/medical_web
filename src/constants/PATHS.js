import { createSearchParams } from "react-router-dom";

export const PATHS = (path, params) => {
	let qParams = {
		...(params && { params }),
	};
	let returnedPath = path;
	if (qParams.params) {
		returnedPath += "?" + createSearchParams(qParams.params);
	}
	return returnedPath;
};
