import { PATHS } from "../../../constants/PATHS";
import {
  postResource,
  getResource,
  deleteResource,
  putResource,
} from "@src/network";

export function addFaqSections(data, onSuccess, onFail) {
  const { type } = data;
  const path = PATHS(`/dashboard/${type}`);
  delete data.type;
  postResource(path, data, onSuccess, onFail);
}

export function getFaqSections(onSuccess, onFail) {
  const path = PATHS(`/faqs/`);
  getResource(path, onSuccess, onFail);
}

// export function editFaq(id, data, onSuccess, onFail) {
//   const path = PATHS(`/dashboard/faqs/${id}`);
//   delete data.id;
//   putResource(path, data, onSuccess, onFail);
// }

export function editFaq(id, data, onSuccess, onFail) {
  const path = PATHS(`/dashboard/faqs/${id}`);
  const { FAQID, createdAt, ...rest } = data; // Exclude FAQID and createdAt from the data object
  putResource(path, rest, onSuccess, onFail); // Send the updated rest object in the request body
}

export function deleteFaq(id, data, onSuccess, onFail) {
  const path = PATHS(`/dashboard/faqs/${id}`);
  delete data.id;
  deleteResource(path, data, onSuccess, onFail);
}
