import * as React from "react";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { colors } from "../App";
import { Divider } from "@mui/material";

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		color: colors.grey54,
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 12,
				fontWeight: 600,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				color: colors.main,
				background: colors.white,
			},
			"&:hover": {
				color: colors.main,
				background: colors.white,
			},
		},
	},
}));

export default function CustomizedMenus({
	id,
	items,
	beforeClose,
	children,
	active,
	className,
	isFooter,
}) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl?.id === id);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={`d-flex align-items-center`}>
			<div onClick={handleClick} id={id}>
				{children}
			</div>
			<StyledMenu
				sx={{ marginTop: `${isFooter && "-18px"}` }}
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: isFooter ? "152px" : 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{
					horizontal: "right",
					vertical: isFooter ? "bottom" : "top",
				}}
				anchorOrigin={{
					horizontal: "right",
					vertical: isFooter ? "top" : "bottom",
				}}>
				{items.map((item) => {
					return (
						<>
							{item.label === "divider" ? (
								<Divider
									sx={{ my: 0.5 }}
									style={{ backgroundColor: "#eaeaea" }}
								/>
							) : (
								<MenuItem
									onClick={() => {
										beforeClose(item.value);
										handleClose();
									}}
									className={`${
										active === item.value ? "main-color fw-600" : null
									} ${className} 
									`}>
									{item.label}
								</MenuItem>
							)}
						</>
					);
				})}
			</StyledMenu>
		</div>
	);
}
