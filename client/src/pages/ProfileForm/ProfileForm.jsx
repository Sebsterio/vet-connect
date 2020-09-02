import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Container } from "@material-ui/core";
import { Nav, Form, isFormFilled } from "components";

import { formFields } from "./ProfileForm-formData";

const useStyles = makeStyles((theme) => ({
	page: {
		display: "flex",
		flexFlow: "column nowrap",
		justifyContent: "space-between",
		padding: theme.spacing(3),
	},
	footer: {
		marginTop: theme.spacing(4),
	},
}));

export const ProfileForm = ({ history, currentProfile, update }) => {
	const c = useStyles();

	const [profile, setProfile] = useState({ ...currentProfile });

	const closeForm = () => history.push("/");

	const submitForm = () => {
		console.log({ profile });
		update(profile);
		closeForm();
	};

	const canSubmit = () => isFormFilled(formFields, profile);

	return (
		<Container maxWidth="xs" className={c.page}>
			<Form state={profile} setState={setProfile} fields={formFields} />
			<div className={c.footer}>
				<Nav
					textLeft="Cancel"
					onClickLeft={closeForm}
					textRight="Save"
					onClickRight={submitForm}
					disabledRight={!canSubmit()}
					noArrows
				/>
			</div>
		</Container>
	);
};