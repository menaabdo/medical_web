import { PATHS } from "../../constants/PATHS";
import { getResource, postResource } from "@src/network";

//send messages requests
export function getAllUsersDropdown(data, onSuccess, onFail) {
  const path = PATHS(`/users`, data);
  getResource(path, onSuccess, onFail);
}

export function sendEmailToAll(data, onSuccess, onFail) {
  const path = PATHS(`/send-email`);
  postResource(path, data, onSuccess, onFail);
}

export function sendSingleEmail(data, onSuccess, onFail) {
  const path = PATHS(`/send-single-email`);
  postResource(path, data, onSuccess, onFail);
}

export function sendNotificationToAll(data, onSuccess, onFail) {
  const path = PATHS(`/send-notification`);
  postResource(path, data, onSuccess, onFail);
}

export function sendSingleNotification(data, onSuccess, onFail) {
  const path = PATHS(`/send-single-notification`);
  postResource(path, data, onSuccess, onFail);
}

//Contact us requests
export function getContactUsRequests(data, onSuccess, onFail) {
  const path = PATHS(`/dashboard/contact-us-forms`, data);
  getResource(path, onSuccess, onFail);
}

export function sendContactUsFormsMessage(data, onSuccess, onFail) {
  const { formId } = data;
  const path = PATHS(`/dashboard/contact-us-forms/${formId}/send-email`);
  delete data.formId;
  postResource(path, data, onSuccess, onFail);
}
