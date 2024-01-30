import { useState, useEffect } from "react";
import DesktopSideBar from "./DesktopSideBar/DesktopSideBar";
import MobileSideBar from "./MobileSideBar/MobileSideBar";

function SideBar({ showDrawer }) {
  const [isMobile, updateIsMobile] = useState(false);
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
    if (window.innerWidth < 786) {
      updateIsMobile(true);
    } else {
      updateIsMobile(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      updateIsMobile(true);
    } else {
      updateIsMobile(false);
    }
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  return (
    <div className={isMobile ? "floatIcon" : "parentSideBar"}>
      {isMobile ? (
        <MobileSideBar showDrawerr={showDrawer} />
      ) : (
        <DesktopSideBar />
      )}
    </div>
  );
}

export default SideBar;
