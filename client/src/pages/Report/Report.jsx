import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";
import { Alert } from "components/Alert";
import { ProblemsList } from "./components";
import { getDateString } from "utils/date";

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
	main: {
		display: "grid",
		gridGap: theme.spacing(3),
	},
}));

const Report = ({ history, match, getReport }) => {
	const clx = useStyles();

	const { id } = match.params;
	if (!id) return <Redirect to="/not-found" />;

	const report = getReport(id);
	const { date, title, alert, problemList } = report;

	return (
		<Container maxWidth="xs" className={clx.page}>
			<Typography
				variant="h5"
				align="center"
				children={`${getDateString(date)} - ${title}`}
			/>

			<Container className={clx.main}>
				<Alert level={alert} alignLeft />
				<Typography children="Problems List" component="h3" variant="h5" />
				<ProblemsList data={problemList} />
			</Container>

			<Button
				fullWidth
				variant="outlined"
				color="default"
				children="Close"
				className={clx.navButton}
				onClick={() => history.goBack()}
			/>
		</Container>
	);
};

export default Report;
