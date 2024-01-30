import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import { BpCheckbox } from "./Checkbox";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const handleKeyPress = (event, type) => {
  const allowedKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Delete",
    "Backspace",
  ];

  if (type === "number" || type === "tel") {
    const { key } = event;
    const { value } = event.target;
    if (
      key === "-" ||
      (key === "0" && value.length === 0) ||
      key === "e" ||
      key === "ArrowDown" ||
      key === "ArrowUp" ||
      !allowedKeys.includes(key)
    )
      event.preventDefault();
  }
};
const RedditSelectBox = styled((props) => {
  return (
    <Select
      InputProps={{ disableUnderline: true }}
      {...props}
      IconComponent={KeyboardArrowDownOutlinedIcon}
      renderValue={props.multiple && ((selected) => selected.join(", "))}
    >
      {props.multiple
        ? props?.options?.map((option) => {
            return (
              <MenuItem value={option.value}>
                <BpCheckbox
                  size={"small"}
                  className="p-0 me-2"
                  checked={props?.value?.indexOf(option.value) > -1}
                />
                <ListItemText primary={option._id} />
              </MenuItem>
            );
          })
        : props?.options?.map((option) => {
            return <MenuItem value={option.value}>{option._id}</MenuItem>;
          })}
    </Select>
  );
})(({ theme }) => ({
  overflow: "hidden",
  borderRadius: 4,
  width: "100%",
  height: "100%",
  // padding: "10px 16px",
  backgroundColor: "transparent",
  border: "1px solid #eaeaea",
  textAlign: "left",
  borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
  transition: theme.transitions.create([
    "border-color",
    "background-color",
    "box-shadow",
  ]),
  ".MuiFilledInput-input": {
    padding: "21px 16px 9px",
    // height: "60%",
  },

  ".css-fajzgk-MuiInputBase-root-MuiFilledInput-root-MuiSelect-root:hover": {
    backgroundColor: "#fff",
  },
  "&::before": { borderBottom: "none !important" },
}));

const RedditTextField = styled((props) => (
  <TextField
    InputProps={{
      disableUnderline: true,
    }}
    {...props}
    defaultValue={props.defaultValue}
    onWheel={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    onKeyDown={(e) => {
      handleKeyPress(e, props.type);
    }}
    rows={props.multiline && 2}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    width: "100%",
    height: "100%",
    // padding: "10px 16px",
    backgroundColor: "transparent",
    border: "1px solid #eaeaea",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    ".MuiFilledInput-input": {
      padding: "13px 16px 5px",
      height: "63%",
    },
    "&:before": {
      display: "none",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      "&:before": {
        display: "none",
      },
    },
  },
}));

export default function InputForm(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box component="form">
      <FormControl variant="standard"></FormControl>
      {props.type === "select" ? (
        <FormControl variant="filled">
          <InputLabel id="demo-simple-select-standard-label">
            {props.label}
          </InputLabel>
          <RedditSelectBox {...props} />
        </FormControl>
      ) : (
        <RedditTextField
          id="reddit-input"
          variant="filled"
          {...props}
          type={
            props.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : props.type
          }
          InputProps={
            props.type === "password"
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : props.type === "search"
              ? { endAdornment: props.endAdornment }
              : { endAdornment: props.endAdornment }
          }
        />
      )}
    </Box>
  );
}
