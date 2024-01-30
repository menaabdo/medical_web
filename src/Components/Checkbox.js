import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import { colors } from "../App";

const BpIcon = styled("span")(({ theme, size }) => ({
	borderRadius: 4,
	width: size === "small" ? 16 : size === "medium" ? 20 : 24,
	height: size === "small" ? 16 : size === "medium" ? 20 : 24,
	boxShadow:
		theme.palette.mode === "dark"
			? "0 0 0 1px rgb(16 22 26 / 40%)"
			: "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
	outline: `2px auto ${colors.greyRegular}`,
	backgroundColor: colors.white,
	backgroundImage:
		theme.palette.mode === "dark"
			? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
			: "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
	".Mui-focusVisible &": {
		outline: `2px auto ${colors.main}`,
		outlineOffset: 2,
	},
	"input:hover ~ &": {
		backgroundColor: colors.white,
		outline: `2px auto ${colors.main}`,
	},
	"input:disabled ~ &": {
		outline: "none",
		boxShadow: "none",
		background: colors.disabled,
	},
}));

const BpCheckedIcon = styled(BpIcon)(({ theme, size }) => ({
	borderRadius: 4,
	backgroundColor: colors.main,
	outline: "none",
	"&:before": {
		display: "block",
		width: size === "small" ? 16 : size === "medium" ? 20 : 24,
		height: size === "small" ? 16 : size === "medium" ? 20 : 24,
		backgroundImage:
			"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
			" fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
			"1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
		content: '""',
	},
	"input:hover ~ &": {
		backgroundColor: colors.main,
		outline: "none",
	},
	"input:disabled ~ &": {
		outline: "none",
		boxShadow: "none",
		background: colors.insideComp,
		"&:before": {
			backgroundImage:
				"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
				" fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
				"1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%238D8D8D'/%3E%3C/svg%3E\")",
		},
	},
}));

// Inspired by blueprintjs
export function BpCheckbox(props) {
	return (
		<Checkbox
			sx={{
				"&:hover": { bgcolor: "transparent" },
			}}
			disableRipple
			color="default"
			checkedIcon={<BpCheckedIcon size={props.size} />}
			icon={<BpIcon size={props.size} />}
			inputProps={{ "aria-label": "Checkbox demo" }}
			{...props}
		/>
	);
}
