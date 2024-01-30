import { PATHS } from "../../constants/PATHS";
import {
  getResource,
  postResource,
  putResource,
  deleteResource,
} from "@src/network";

export function getAllPackages(onSuccess, onFail) {
  const path = PATHS(`/dashboard/packages`);
  getResource(path, onSuccess, onFail);
}

export function getPackageDuration(onSuccess, onFail) {
  const path = PATHS(`/dashboard/package-duration-settings`);
  getResource(path, onSuccess, onFail);
}
export function createPackage(data, onSuccess, onFail) {
  const path = PATHS(`/dashboard/packages`);
  postResource(path, data, onSuccess, onFail);
}
export function editPackage(data, onSuccess, onFail) {
  const { id } = data;
  const path = PATHS(`/dashboard/packages/${id}`);
  delete data.id;
  putResource(path, data, onSuccess, onFail);
}
export function deletePackage(data, onSuccess, onFail) {
  const { id } = data;
  const path = PATHS(`/dashboard/packages/${id}`);
  delete data.id;
  deleteResource(path, onSuccess, onFail, data);
}
export function getPackagesSectionTitle(onSuccess, onFail) {
  const path = PATHS(`/dashboard/packages-section-title`);
  getResource(path, onSuccess, onFail);
}
export function editPackageTitle(data, onSuccess, onFail) {
  const path = PATHS(`/dashboard/packages-section-title`);
  putResource(path, data, onSuccess, onFail);
}

export function getPackageDetails(data, onSuccess, onFail) {
  const path = PATHS(`/dashboard/packages/${data?.id}`);
  getResource(path, onSuccess, onFail);
}

export function activatePackage(data, onSuccess, onFail) {
  const { id } = data;
  const path = PATHS(`/dashboard/packages/${id}/activate`);
  delete data.id;
  postResource(path, data, onSuccess, onFail);
}
export function deactivatePackage(data, onSuccess, onFail) {
  const { id } = data;
  const path = PATHS(`/dashboard/packages/${id}/deactivate`);
  delete data.id;
  postResource(path, data, onSuccess, onFail);
}

export function isPopularPackage(data, onSuccess, onFail) {
  const { id } = data;
  const path = PATHS(`/dashboard/packages/${id}/most-popular`);
  delete data.id;
  postResource(path, data, onSuccess, onFail);
}
