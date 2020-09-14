import React, { useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Head, Body, Footer } from "./components";

import { alertData } from "components";
import { getDateString } from "utils/date";
import { getAugmentedReports, getNewSelected } from "./VetReports-utils";
import { useStyles } from "./VetReports-styles";

// =========================== Constants ===============================

const columns = [
	{
		id: "alert",
		label: "Alert",
		format: (alert) => (
			<FiberManualRecordIcon style={{ color: alertData[alert].color }} />
		),
	},
	{
		id: "dateCreated",
		label: "Date",
		format: (val) => getDateString(val),
	},
	{ id: "title", label: "Title" },
	{ id: "name", label: "Pet's name" },
	{ id: "species", label: "Species" },
	{ id: "breed", label: "Breed" },
	{ id: "ownerName", label: "Owner" },
];

const searchableFields = [
	"name",
	"species",
	"breed",
	"ownerName",
	"dateCreated",
	"title",
];

// =========================== Component ===============================

export const VetReports = ({ history, reports, modifyReport }) => {
	const c = useStyles();

	// ---------------------------- Data ----------------------------

	const [rows, setRows] = useState([]);

	useEffect(() => {
		setRows(getAugmentedReports(reports));
	}, [reports]);

	// -------------------------- Selection -------------------------

	const [selected, setSelected] = React.useState([]);

	const handleSelectAllClick = (e) => {
		if (!e.target.checked) return setSelected([]);
		const newSelecteds = rows.map((row) => row.id);
		setSelected(newSelecteds);
	};

	const handleCheckboxClick = (e, id) => {
		const selectedIndex = selected.indexOf(id);
		setSelected(getNewSelected(id, selected, selectedIndex));
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// -------------------------- Search ---------------------------

	const [query, setQuery] = useState("");

	const clearQuery = () => {
		setQuery("");
		setRows(getAugmentedReports(reports));
	};

	// Filter rows by search query (match any field)
	const handleInput = (e) => {
		const value = e.target.value;
		if (value === "") return clearQuery();
		setQuery(value);
		setRows(
			getAugmentedReports(reports).filter((row) =>
				searchableFields.some((field) => {
					const fieldString =
						field === "dateCreated"
							? getDateString(row[field])
							: String(row[field]).toLowerCase();
					const valueString = value.toLowerCase();
					return fieldString.includes(valueString);
				})
			)
		);
	};

	// ---------------- Modification & Navigation ------------------

	const markAsSeen = (id) =>
		modifyReport({ id, update: { dateSeen: new Date() } });

	// const openReport = (id) => {
	// 	history.push(`/report/${id}`);
	// 	markAsSeen(id);
	// };

	const markSelectedAsSeen = () => {
		selected.forEach((id) => markAsSeen(id));
		setSelected([]);
	};

	// ------------------------ Pagination ------------------------

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(+e.target.value);
		setPage(0);
	};

	// --------------------------- View ---------------------------

	return (
		<Paper className={c.root}>
			<TableContainer className={c.container}>
				<Table stickyHeader>
					<Head
						{...{ c, columns, handleSelectAllClick }}
						/* order, orderBy, */
						/* handleRequestSort */
						numSelected={selected.length}
						rowCount={rows.length}
					/>
					<Body
						{...{ c, page, rowsPerPage, isSelected }}
						{...{ handleCheckboxClick, columns, rows }}
					/>
				</Table>
			</TableContainer>
			<Footer
				{...{ selected, markSelectedAsSeen, rows, rowsPerPage, page }}
				{...{ handleChangePage, handleChangeRowsPerPage, query, handleInput }}
			/>
		</Paper>
	);
};
