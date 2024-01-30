import React from "react";
import { Helmet } from "react-helmet";

const WebsiteTitle = ({ title }) => {
	return (
		<Helmet>
			<title>{title?.length ? "Gate Admin | " + title : "Gate Admin"}</title>
		</Helmet>
	);
};

export default WebsiteTitle;
