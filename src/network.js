import axios from "axios";
import { responseErrorHandeler } from "@helpers/responseErrorHandeler";
export const baseUrl =
	/*"https://thingproxy.freeboard.io/fetch/" +*/ process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
let token = null;
let lang = null;
export function getToken(newToken) {
	token = newToken;
}
export function getLang(newLang) {
	lang = newLang === "ge" ? "de" : newLang;
}

export function getResource(path, onSuccess, onFail, reqAuth = true) {
	let requestData = {
		method: "get",
		url: baseUrl + path,
		headers: { "accept-language": lang },
	};

	if (reqAuth) {
		requestData.headers = {
			...requestData.headers,
			Authorization: "Bearer " + token,
		};
	} else {
		requestData.headers = {
			...requestData.headers,
			API_KEY,
		};
	}

	axios(requestData)
		.then((res) => {
			onSuccess(res.data);
		})
		.catch((fail) => {
			onFail(fail.response);
			responseErrorHandeler(fail.response?.status);
		});
}

export function postResource(
	path,
	data,
	onSuccess,
	onFail,
	reqAuth = true,
	multiPart = false
) {
	let requestData = {
		method: "post",
		url: baseUrl + path,
		headers: {
			"accept-language": lang,
		},
		data,
	};

	if (token && reqAuth) {
		requestData.headers = {
			...requestData.headers,
			Authorization: "Bearer " + token,
		};
	} else {
		requestData.headers = {
			...requestData.headers,
			API_KEY,
		};
	}

	if (multiPart) {
		requestData.headers = {
			...requestData.headers,
			"content-type": "multipart/form-data",
		};
	}

	axios(requestData)
		.then((res) => {
			onSuccess(res.data);
		})
		.catch((fail) => {
			onFail(fail.response);
			responseErrorHandeler(fail?.response?.status);
		});
}

export function deleteResource(path, onSuccess, onFail, data, reqAuth = true) {
	let requestData = {
		method: "delete",
		url: baseUrl + path,
		headers: { "accept-language": lang },
	};
	if (data) requestData.data = data;

	if (token && reqAuth) {
		requestData.headers = {
			...requestData.headers,
			Authorization: "Bearer " + token,
		};
	} else {
		requestData.headers = {
			...requestData.headers,
			API_KEY,
		};
	}

	axios(requestData).then(
		(res) => {
			onSuccess(res.data);
		},
		(fail) => {
			onFail(fail.response);
			responseErrorHandeler(fail.response.status);
		}
	);
}

export function patchResource(
	path,
	data,
	onSuccess,
	onFail,
	reqAuth = true,
	multipart = false
) {
	let requestData = {
		method: "patch",
		url: baseUrl + path,
		headers: { "accept-language": lang },
		data,
	};

	if (token && reqAuth) {
		requestData.headers = {
			...requestData.headers,
			Authorization: "Bearer " + token,
		};
	} else {
		requestData.headers = {
			...requestData.headers,
			API_KEY,
		};
	}
	if (multipart) {
		requestData.headers = {
			...requestData.headers,
			"content-type": "multipart/form-data",
		};
	}

	axios(requestData).then(
		(res) => {
			onSuccess(res.data);
		},
		(fail) => {
			onFail(fail.response);
			responseErrorHandeler(fail.response.status);
		}
	);
}
export function putResource(
	path,
	data,
	onSuccess,
	onFail,
	reqAuth = true,
	multipart = false
) {
	let requestData = {
		method: "put",
		url: baseUrl + path,
		headers: { "accept-language": lang },
		data,
	};

	if (token && reqAuth) {
		requestData.headers = {
			...requestData.headers,
			Authorization: "Bearer " + token,
		};
	} else {
		requestData.headers = {
			...requestData.headers,
			API_KEY,
		};
	}

	if (multipart) {
		requestData.headers = {
			...requestData.headers,
			"content-type": "multipart/form-data",
		};
	}

	axios(requestData).then(
		(res) => {
			onSuccess(res.data);
		},
		(fail) => {
			onFail(fail.response);
			responseErrorHandeler(fail.response.status);
		}
	);
}
