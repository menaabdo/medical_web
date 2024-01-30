import { PATHS } from "../../../constants/PATHS";
import { postResource , getResource } from "@src/network";

export function addLandingPageSection1(data, onSuccess, onFail) {
  const path = PATHS(`/dashboard/landing-page/section1`);
  postResource(path, data, onSuccess, onFail);
}

export function getLandingPagesection1(onSuccess , onFail){
const path = PATHS(`/dashboard/landing-page/`);
getResource(path ,onSuccess ,  onFail)
}
