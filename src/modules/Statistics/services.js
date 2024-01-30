import { PATHS } from "../../constants/PATHS";
import { getResource } from "@src/network";

export function getStatistics(data, onSuccess, onFail) {
  const path = PATHS(`/dashboard/statistics`, data);
  getResource(path, onSuccess, onFail);
}
