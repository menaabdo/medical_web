import { PATHS } from "../../constants/PATHS";
import { postResource } from "@src/network";

export function submitLogin(data, onSuccess, onFail) {
	const path = PATHS(`/dashboard/staff/login`);
	postResource(path, data, onSuccess, onFail);
}
