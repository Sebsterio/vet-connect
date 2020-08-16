import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "center",
	},
	item: {
		textDecoration: "initial",
		marginBottom: theme.spacing(1),
	},
	alert: {
		alignItems: "center",
	},
}));

export const Head = ({ surveyIsLoaded, clearSurvey }) => {
	const clx = useStyles();

	return (
		<div className={clx.container}>
			{true && (
				<Link to="/clinic-form" className={clx.item}>
					<Alert
						severity="warning"
						children="Choose a clinic to send your pet's health reports to."
						className={clx.alert}
					/>
				</Link>
			)}
			<Collapse in={surveyIsLoaded}>
				<Link to="/analysis" className={clx.item}>
					<Alert
						severity="info"
						children="Click to continue Unfinished Analysis"
						className={clx.alert}
						action={
							<IconButton
								children={<CloseIcon fontSize="inherit" />}
								onClick={clearSurvey}
								color="inherit"
								aria-label="discard unfinished survey"
							/>
						}
					/>
				</Link>
			</Collapse>
		</div>
	);
};