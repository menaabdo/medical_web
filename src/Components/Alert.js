import { useEffect, useState } from "react";
import { Alert as MUIAlert, Collapse } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Error from "@assets/icons/error.svg";
import Success from "@assets/icons/success.svg";
import Info from "@assets/icons/info.svg";
import Warning from "@assets/icons/warning.svg";
import closeIcon from "@assets/icons/close-icon-circle.svg";
import { useSelector } from "react-redux";

function Alert(props) {
	const [open, setOpen] = useState(false);
	const { size } = useSelector((state) => state.screen);
	const { severity } = props;

	useEffect(() => {
		setOpen(props.open);
	}, [props.open]);
	const severityData = {
		error: { img: Error, bg: "#FFEBED" },
		success: { img: Success, bg: "#D4FFF2" },
		info: { img: Info, bg: "#D2F0FF" },
		warning: { img: Warning, bg: "#FEECB5" },
	};

	return (
		<div className="f-poppins-16px">
			<Collapse in={open}>
				<MUIAlert
					icon={<img src={severityData[severity]?.img} alt="Warning" />}
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
								props?.onClose();
							}}>
							<img src={closeIcon} alt="closeIcon" />
						</IconButton>
					}
					sx={{
						mb: 2,
						bgcolor: severityData[severity]?.bg,
						borderRadius: "8px",
						width: size === "small" ? "312px" : "416px",
					}}
					{...props}
					variant="outlined">
					{props.children}
				</MUIAlert>
			</Collapse>
		</div>
	);
}

export default Alert;
