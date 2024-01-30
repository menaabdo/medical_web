import { PATHS } from "../../constants/PATHS";
import { postResource, getResource } from "@src/network";
import { putResource } from "../../network";

export function getAllAdmins(onSuccess, onFail) {
  const path = PATHS(`/dashboard/allStaff`);
  getResource(path, onSuccess, onFail);
}

export function addAdmin(data, onSuccess, onFail) {
  const path = PATHS(`/dashboard/staff`);
  postResource(path, data, onSuccess, onFail);
}
export function editAdmin(data, onSuccess, onFail) {
  const { id } = data;
  const path = PATHS(`/dashboard/staff/${id}`);
  delete data.id;
  putResource(path, data, onSuccess, onFail);
}
