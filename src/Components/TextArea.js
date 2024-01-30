import * as React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

export default function TextArea({ value, onChange , title , rows , cols}) {
  const { t } = useTranslation();

  const handleChange = (event) => {
    onChange(event.target.value); // Pass the input value back to the parent component
  };

  const Textarea = styled(TextareaAutosize)(
    ({ theme }) => `
    overflow-y: auto !important;
    width: 100%;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 4px;
    background-color: transparent;
    border-color: ${theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843"};
    border: 1px solid #eaeaea;

    transition: ${theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ])};

    &:before {
      display: none;
    }

    &:hover {
      background-color: transparent;
    }

    &:focus {
      background-color: transparent;
      &:before {
        display: none;
      }
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  return (
    <>
      <Box component="form">
        <FormControl variant="filled">
          <Textarea
            className="textArea"
            aria-label="minimum height"
            minRows={!rows ? 5 : rows}
            placeholder={`${!title ? t("msgBody") : title}`}
            value={value}
            cols={cols}
            onChange={handleChange}
          />
        </FormControl>
      </Box>
    </>
  );
}
