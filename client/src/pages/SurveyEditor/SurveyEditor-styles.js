import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	page: {
		padding: theme.spacing(2),
		width: "100%",
	},
	accordion: {
		width: "100%",
	},
	accordionSummaryContent: {
		display: "flex",
		alignItems: "center",
		margin: theme.spacing(1, 0),
	},
	accordionDetails: {
		flexFlow: "column nowrap",
	},
	popover: {
		padding: theme.spacing(2),
	},
	backdrop: {
		zIndex: theme.zIndex.accordion + 1,
	},
}));
