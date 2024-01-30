import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import { colors } from "../App";

const BpIcon = styled("span")(({ theme, size }) => ({
	borderRadius: "50%",
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
	backgroundColor: colors.main,
	outline: "none",
	backgroundImage:
		"linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
	"&:before": {
		display: "block",
		width: size === "small" ? 16 : size === "medium" ? 20 : 24,
		height: size === "small" ? 16 : size === "medium" ? 20 : 24,
		backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
		content: '""',
	},
	"input:hover ~ &": {
		backgroundColor: colors.main,
		outline: "none",
	},
	"input:disabled ~ &": {
		outline: "none",
		boxShadow: "none",

		background: colors.disabled,
		"&:before": {
			backgroundImage: `radial-gradient(${colors.greyRegular},${colors.greyRegular} 28%,transparent 32%)`,
		},
	},
}));

// Inspired by blueprintjs
export function BpRadio(props) {
	return (
		<Radio
			disableRipple
			color="default"
			checkedIcon={<BpCheckedIcon size={props.size} />}
			icon={<BpIcon size={props.size} />}
			{...props}
		/>
	);
}
