// User
import { getIsAuthenticated } from "redux/user/user-selectors";
import * as userActions from "redux/user/user-actions";
import {
	syncUser,
	createUser,
	fetchUser,
	deleteUser,
} from "redux/user/user-operations";

// Profile
import * as profileActions from "redux/profile/profile-actions";
import {
	createProfile,
	fetchProfile,
	deleteProfile,
} from "redux/profile/profile-operations";

// Clinic
import * as clinicActions from "redux/clinic/clinic-actions";
import { syncClinic } from "redux/clinic/clinic-operations";

// Pets
import * as petsActions from "redux/pets/pets-actions";

// Survey
import * as surveyActions from "redux/survey/survey-actions";

// Survey-data
// import * as surveyDataActions from "redux/survey-data/survey-data-actions";
import { fetchSurvey } from "redux/survey-data/survey-data-operations";

/*********************************************
 *
 * Coordinates operations across reducers
 *
 *********************************************/

// AUX. Runs on sync and sign-in
const fetchAllData = () => async (dispatch) => {
	const res = await dispatch(fetchProfile());
	dispatch(syncClinic(res));
	dispatch(fetchSurvey());
};

// ---------------------------- syncData --------------------------------

// On app load, check all docs for updates
export const syncData = () => async (dispatch, getState) => {
	const signedIn = getIsAuthenticated(getState());
	if (!signedIn) return;
	await dispatch(syncUser());
	dispatch(fetchAllData());
};

// ---------------------------- signUp ----------------------------------

// Create new User and get token
// Then, create Profile
export const signUp = (formData) => async (dispatch) => {
	await dispatch(createUser(formData));
	const { firstName } = formData;
	if (firstName) dispatch(profileActions.modify({ firstName }));
	dispatch(createProfile({ firstName }));
};

// ---------------------------- signIn ----------------------------------

// Exchange password for token
// Then, fetch all data
export const signIn = (formData) => async (dispatch) => {
	await dispatch(fetchUser(formData));
	dispatch(fetchAllData());
};

// -------------------------- closeAccount ------------------------------

// Delete all user-related docs; Restart app
export const closeAccount = (formData) => async (dispatch) => {
	await Promise.all([
		dispatch(deleteUser(formData)),
		dispatch(deleteProfile()),
	]);
	dispatch(signOut());
	localStorage.clear();
};

// ---------------------------- signOut ---------------------------------

// Clear store and persistor;
export const signOut = () => (dispatch) => {
	dispatch(userActions.clear());
	dispatch(profileActions.clear());
	dispatch(clinicActions.clear());
	dispatch(petsActions.clear());
	dispatch(surveyActions.clear());
};
