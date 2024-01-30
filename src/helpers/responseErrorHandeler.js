export const responseErrorHandeler = (statusCode) => {
	switch (statusCode) {
		case 401: {
			// localStorage.removeItem("persist:gate-plus");
			// window.location.reload();
			break;
		}
		default: {
			break;
		}
	}
};
