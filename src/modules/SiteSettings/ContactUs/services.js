import { PATHS } from "../../../constants/PATHS";
import { postResource, getResource } from "@src/network";

export function addContactUsSections(data, onSuccess, onFail) {
  const { type } = data;
  const path = PATHS(`/dashboard/contact-us/${type}`);
  delete data.type;
  postResource(path, data, onSuccess, onFail);
}

export function getContactUsSections(onSuccess, onFail) {
  const path = PATHS(`/contact-us`);
  getResource(path, onSuccess, onFail);
}
