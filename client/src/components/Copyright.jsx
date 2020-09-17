import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export const Copyright = () => (
	<Typography variant="body2" color="textSecondary" align="center">
		{"Copyright © "}
		<Link color="inherit" href="https://animalysis.com">
			Animalysis
		</Link>
		{` ${new Date().getFullYear()}.`}
	</Typography>
);
