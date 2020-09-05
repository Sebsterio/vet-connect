import React from "react";
import { connect } from "react-redux";

import { getIsVet } from "redux/user/user-selectors";
import { getClinicId } from "redux/profile/profile-selectors";
import { getIsRegistered } from "redux/clinic/clinic-selectors";
import {
	fetchClinics,
	joinClinic,
	joinOrganisation,
} from "redux/clinic/clinic-operations";

import { ClinicSearch } from "./ClinicSearch";

const mapStateToProps = (state) => ({
	isVet: getIsVet(state),
	hasClinic: getIsRegistered(state),
	clinicId: getClinicId(state),
});

const mapDispatchToProps = (dispatch) => ({
	fetchClinics: (data) => dispatch(fetchClinics(data)),
	joinClinic: (data) => dispatch(joinClinic(data)),
	joinOrganisation: (data) => dispatch(joinOrganisation(data)),
});

const ClinicSearchContainer = (props) => <ClinicSearch {...props} />;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClinicSearchContainer);