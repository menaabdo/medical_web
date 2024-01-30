import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import logoImg from "@assets/icons/logo-new.svg";
import closeIcon from "@assets/icons/close-circle-grey-bg.svg";
import { ROUTES } from "../constants/_routes";

export default function SwipeableTemporaryDrawer(props) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const { items, beforeClose, active } = props;
  const list = (anchor) => (
    <Box
      sx={{ width: "100vw" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="temporary-drawer"
    >
      <div className="d-flex justify-content-between hamburger-menu-header">
        <Link to={ROUTES.HOME}>
          <img src={logoImg} className="logo" alt="logo" />
        </Link>
        <img
          src={closeIcon}
          className="logo cursor-pointer"
          alt="logo"
          onClick={() => {
            toggleDrawer(anchor, false);
          }}
        />
      </div>
      <div className="hamburger-menu-body">
        {items.map((item) => {
          return (
            <>
              {item.label === "divider" ? (
                <Divider
                  sx={{ my: 0.5 }}
                  style={{ backgroundColor: "#eaeaea" }}
                />
              ) : (
                <ListItem
                  key={item.value}
                  disablePadding
                  onClick={() => {
                    beforeClose(item.value);
                    toggleDrawer(anchor, false);
                  }}
                  className={`${
                    active === item.value ? "main-color fw-600" : null
                  } f-poppins-12px my-4`}
                >
                  {item.label}
                </ListItem>
              )}
            </>
          );
        })}
      </div>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{props.children}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
