import { PATHS } from "../../constants/PATHS";
import { getResource, postResource } from "@src/network";

export function getDeletedAccounts(data, onSuccess, onFail) {
  const { type } = data;
  const path = PATHS(`/dashboard/${type}/deletedAccounts`, data);
  delete data.type;
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
