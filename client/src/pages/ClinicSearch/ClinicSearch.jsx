import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Page, Stack, Nav, LinkBlock } from "components";
import { ClinicSnippet } from "./components";

export const ClinicSearch = ({
	// router
	history,
	// store
	isVet,
	hasClinic,
	clinicId,
	isDemo,
	// dispatch
	fetchClinics,
	joinClinic,
	setError,
}) => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fetchedAll, setFetchedAll] = useState(false);

	const hasResults = !!results.length;
	const canFetchMore = hasResults && !fetchedAll && !loading;

	const helperText = !query.length
		? "Search by name, email, telephone, or address"
		: null;

	// Don't show Demo Clinic outside of demo mode
	const filterResults = (results) =>
		isDemo ? results : results.filter((res) => res.name !== "Demo Clinic");

	const fetch = async (e, data, callback) => {
		e.preventDefault();
		setLoading(true);
		setFetchedAll(false);
		const res = await fetchClinics(data);
		if (res) callback(filterResults(res));
		else setFetchedAll(true);
		setLoading(false);
	};

	// ------------------------- Handlers ----------------------------

	const closeForm = () => history.push("/");

	const handleInput = (e) => setQuery(e.target.value);

	// Replace results
	const search = async (e) =>
		fetch(e, { query }, (res) => setResults([...res]));

	// Add to results
	const loadMore = async (e) =>
		fetch(e, { query, skip: results.length }, (res) =>
			setResults([...results, ...res])
		);

	const handleSnippetClick = async (data) => {
		if (isDemo)
			return setError({
				target: "generic",
				msg: "Changing clinic is not allowed in demo mode",
			});
		const success = await joinClinic(data);
		if (success) history.push("/my-clinic");
	};

	// ------------------------- Selectors ---------------------------

	const isCurrent = (id) => id === clinicId;

	// --------------------------- View ------------------------------

	const linkText = isVet
		? hasClinic
			? "My organisation"
			: "Register an organisation"
		: // If not vet
		hasClinic
		? "My clinic"
		: "Custom clinic";

	return (
		<Page
			header={<LinkBlock to="/my-clinic" children={linkText} />}
			main={
				<Stack>
					<form onSubmit={search}>
						<TextField
							autoFocus
							fullWidth
							label="Search"
							value={query}
							onChange={handleInput}
							variant="outlined"
							disabled={loading}
							helperText={helperText}
						/>
					</form>

					{hasResults &&
						results.map((result) => (
							<ClinicSnippet
								key={result.id}
								clinicData={result}
								isCurrent={isCurrent(result.id)}
								handleClick={handleSnippetClick}
							/>
						))}

					{(hasResults || loading) && (
						<Button onClick={loadMore} disabled={!canFetchMore}>
							{fetchedAll ? "All loaded" : loading ? "Loading..." : "Load more"}
						</Button>
					)}
				</Stack>
			}
			footer={<Nav textLeft="Cancel" onClickLeft={closeForm} noArrows />}
		/>
	);
};
