import { PATHS } from "../../constants/PATHS";
import { getResource, postResource } from "@src/network";
import { deleteResource, putResource } from "../../network";

export function getActivationForms(data, onSuccess, onFail) {
  const { type } = data;
  delete data.type;
  const path = PATHS(`/dashboard/${type}/allActivationForms`, data);
  getResource(path, onSuccess, onFail);
}
export function getActivationFormById(data, onSuccess, onFail) {
  const { type } = data;
  delete data.type;
  const path = PATHS(`/dashboard/${type}/activationForm/${data?.id}`);
  getResource(path, onSuccess, onFail);
}
export function getDropdownData(data, onSuccess, onFail) {
  const path = PATHS("/dropdowns", data);
  getResource(path, onSuccess, onFail, false);
}
export function getNurseDetails(data, onSuccess, onFail) {
  const { type } = data;
  delete data.type;
  const path = PATHS(`/dashboard/${type}/account/${data?.id}`);
  getResource(path, onSuccess, onFail);
}

export function acceptRejectUser(data, onSuccess, onFail) {
  const { id, isAccept, type } = data;
  const path = PATHS(
    `/dashboard/${type}/${isAccept ? "activation" : "rejection"}/${id}`
  );
  delete data.id;
  delete data.isAccept;
  delete data.type;
  postResource(path, data, onSuccess, onFail);
}
export function getRejectedAccounts(data, onSuccess, onFail) {
  const { type } = data;
  delete data.type;
  const path = PATHS(`/dashboard/${type}/rejecetedAccounts`, data);
  getResource(path, onSuccess, onFail);
}

export function handleEditRejectionReason(data, onSuccess, onFail) {
  const { type, id, userId } = data;
  delete data.type;
  const path = PATHS(`/dashboard/${type}/${userId}/rejectionReason/${id}`);
  putResource(path, data, onSuccess, onFail);
}
export function getAllUsers(data, onSuccess, onFail) {
  const { type } = data;
  delete data.type;
  const path = PATHS(`/dashboard/${type}/accounts`, data);
  getResource(path, onSuccess, onFail);
}
export function cancelRejection(data, onSuccess, onFail) {
  const { id, type } = data;
  const path = PATHS(`/dashboard/${type}/cancelRejection/${id}`);
  delete data.id;
  delete data.type;
  postResource(path, data, onSuccess, onFail);
}
export function deleteUser(data, onSuccess, onFail) {
  const { id } = data;
  const path = PATHS(`/users/${id}`);
  delete data.id;
  deleteResource(path, onSuccess, onFail, data);
}
export function getRejectionReason(data, onSuccess, onFail) {
  const { type, id } = data;
  delete data.type;
  delete data.id;
  const path = PATHS(`/dashboard/${type}/allRejectionReasons/${id}`);
  getResource(path, onSuccess, onFail);
}

export function sendMessage(data, onSuccess, onFail) {
  const path = PATHS(`/send-single-email`);
  postResource(path, data, onSuccess, onFail);
}
