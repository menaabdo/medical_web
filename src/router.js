import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "./constants/_routes";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import Signin from "./modules/Signin/Signin";
import AllUsers from "./modules/RulesAndPermisions/AllUsers";
import AllDoctors from "./modules/Doctors/AllDoctors";
import DoctorActivationProcess from "./modules/Doctors/DoctorActivationProcess";
import DoctorRejected from "./modules/Doctors/DoctorRejected";
import DoctorActivationProcessDetails from "./modules/Doctors/DoctorActivationProcessDetails";
import DoctorRejectedDetails from "./modules/Doctors/DotorRejectedDetails";
import AllNurses from "./modules/Nurses/AllNurses";
import NurseActivationProcess from "./modules/Nurses/NurseActivationProcess";
import NurseRejected from "./modules/Nurses/NurseRejected";
import NurseActivationProcessDetails from "./modules/Nurses/NurseActivationProcessDetails";
import NurseRejectedDetails from "./modules/Nurses/NurseRejectedDetails";
import AllHospitals from "./modules/Hospitals/AllHospitals";
import HospitalActivationProcess from "./modules/Hospitals/HospitalActivationProcess";
import HospitalRejected from "./modules/Hospitals/HospitalRejected";
import HospitalActivationProcessDetails from "./modules/Hospitals/HospitalActivationProcessDetails";
import HospitalRejectedDetails from "./modules/Hospitals/HospitalRejectedDetails";
import DoctorDetails from "./modules/Doctors/DoctorDetails";
import NurseDetails from "./modules/Nurses/NurseDetails";
import HospitalDetails from "./modules/Hospitals/HospitalDetails";
import Package from "./modules/Hospitals/Package";
import HospitalPackageDetails from "./modules/Hospitals/HospitalPackageDetails";
import DeletedAccounts from "./modules/DeletedAccounts/DeletedAccounts";
import Statistics from "./modules/Statistics/Statistics";
import SendMessage from "./modules/Messages/SendMessage";
import ContactUsRequests from "./modules/Messages/ContactUsRequests";
// import Packages from "./modules/Package/Packages";
// import InActivePackages from "./modules/Package/InActivePackages";
import LandingPage from "./modules/SiteSettings/LandingPage/LandingPage";
import AboutUs from "./modules/SiteSettings/AboutUs/AboutUs";
import ContactUs from "./modules/SiteSettings/ContactUs/ContactUs";
import Faq from "./modules/SiteSettings/FAQ/faq";
import Address from "./modules/SiteSettings/Address/Address";
import Dropdowns from "./modules/SiteSettings/Dropdowns/Dropdowns";
import ActivePackages from "./modules/Packages/ActivePackages";
import InActivePackages from "./modules/Packages/InActivePackages";
import PackageCrud from "./modules/Packages/PackageCrud";

function RouterFile() {
  const [rerender, updateRerender] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const isAuth = auth.token ? true : false;
  useLayoutEffect(() => {
    const pathRestrications = [
      {
        pathname: ROUTES.SIGNIN,
        restrication: isAuth ? ROUTES.DASHBOARD : null,
      },
      {
        pathname: ROUTES.ADMINS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.DOCTORS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.DOCTORSACTIVATIONPROCESS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.DOCTORACTIVATIONPROCESSDETAILS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.DOCTORREJECTEDDETAILS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.NURSES,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.NURSESACTIVATIONPROCESS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.NURSEACTIVATIONPROCESSDETAILS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.NURSEREJECTEDDETAILS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.HOSPITALS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.HOSPITALSACTIVATIONPROCESS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.HOSPITALACTIVATIONPROCESSDETAILS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.HOSPITALREJECTEDDETAILS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.DOCTORDETAILS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.NURSEDETAILS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.HOSPITALDETAILS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.HOSPITALPACKAGE,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.HOSPITALPACKAGEDETAILS,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
      {
        pathname: ROUTES.PACKAGES,
        restrication: isAuth ? null : ROUTES.SIGNIN,
      },
    ];
    const currentRoute = pathRestrications.filter(
      (path) => path.pathname === location.pathname
    );

    if (currentRoute[0]?.restrication) {
      navigate(currentRoute[0].restrication);
      updateRerender((prev) => !prev);
    }

    // eslint-disable-next-line
  }, [location.pathname, navigate, rerender]);

  return (
    <Routes>
      <Route exact path={ROUTES.SIGNIN} element={<Signin />} />
      <Route path={ROUTES.ADMINS} element={<AllUsers />} />
      <Route path={ROUTES.DOCTORS} element={<AllDoctors />} />
      <Route
        path={ROUTES.DOCTORSACTIVATIONPROCESS}
        element={<DoctorActivationProcess />}
      />
      <Route path={ROUTES.DOCTORSREJECTED} element={<DoctorRejected />} />
      <Route
        path={ROUTES.DOCTORACTIVATIONPROCESSDETAILS}
        element={<DoctorActivationProcessDetails />}
      />
      <Route
        path={ROUTES.DOCTORREJECTEDDETAILS}
        element={<DoctorRejectedDetails />}
      />
      <Route path={ROUTES.NURSES} element={<AllNurses />} />
      <Route
        path={ROUTES.NURSESACTIVATIONPROCESS}
        element={<NurseActivationProcess />}
      />
      <Route path={ROUTES.NURSESREJECTED} element={<NurseRejected />} />
      <Route
        path={ROUTES.NURSEACTIVATIONPROCESSDETAILS}
        element={<NurseActivationProcessDetails />}
      />
      <Route
        path={ROUTES.NURSEREJECTEDDETAILS}
        element={<NurseRejectedDetails />}
      />
      <Route path={ROUTES.HOSPITALS} element={<AllHospitals />} />
      <Route path={ROUTES.SendMessage} element={<SendMessage />} />
      <Route path={ROUTES.ContactUsRequests} element={<ContactUsRequests />} />
      <Route
        path={ROUTES.HOSPITALSACTIVATIONPROCESS}
        element={<HospitalActivationProcess />}
      />
      <Route path={ROUTES.HOSPITALSREJECTED} element={<HospitalRejected />} />
      <Route
        path={ROUTES.HOSPITALACTIVATIONPROCESSDETAILS}
        element={<HospitalActivationProcessDetails />}
      />
      <Route
        path={ROUTES.HOSPITALREJECTEDDETAILS}
        element={<HospitalRejectedDetails />}
      />
      <Route path={ROUTES.DOCTORDETAILS} element={<DoctorDetails />} />
      <Route path={ROUTES.NURSEDETAILS} element={<NurseDetails />} />
      <Route path={ROUTES.HOSPITALDETAILS} element={<HospitalDetails />} />
      <Route path={ROUTES.HOSPITALPACKAGE} element={<Package />} />
      <Route
        path={ROUTES.HOSPITALPACKAGEDETAILS}
        element={<HospitalPackageDetails />}
      />{" "}
      {/* <Route path={ROUTES.PACKAGES} element={<Packages />} />
      <Route path={ROUTES.INACTIVEPACKAGES} element={<InActivePackages />} /> */}
      <Route path={ROUTES.ACTIVE_PACKAGES} element={<ActivePackages />} />
      <Route path={ROUTES.INACTIVE_PACKAGES} element={<InActivePackages />} />
      <Route path={ROUTES.ADD_PACKAGE} element={<PackageCrud />} />
      <Route path={ROUTES.EDIT_ACTIVE_PACKAGE} element={<PackageCrud />} />
      <Route path={ROUTES.EDIT_INACTIVE_PACKAGE} element={<PackageCrud />} />
      <Route path={ROUTES.DELETED_ACCOUNTS} element={<DeletedAccounts />} />
      <Route path={ROUTES.DASHBOARD} element={<Statistics />} />
      <Route path={ROUTES.LANDING_PAGE} element={<LandingPage />} />
      <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
      <Route path={ROUTES.CONTACT_US} element={<ContactUs />} />
      <Route path={ROUTES.FAQ} element={<Faq />} />
      <Route path={ROUTES.ADDRESS} element={<Address />} />
      <Route path={ROUTES.DROPDOWNS} element={<Dropdowns />} />
    </Routes>
  );
}
export default RouterFile;
