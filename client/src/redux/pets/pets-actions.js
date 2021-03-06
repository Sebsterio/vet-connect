export const SET_LIST = "pets/SET_LIST";
export const setList = (data) => ({
	type: SET_LIST,
	payload: data,
});

export const MODIFY_LIST = "pets/MODIFY_LIST";
export const modifyList = (data) => ({
	type: MODIFY_LIST,
	payload: data,
});

export const CLEAR = "pets/CLEAR";
export const clear = () => ({
	type: CLEAR,
});

// ------------------ Pet --------------------

export const ADD_PET = "pets/ADD_PET";
export const addPet = (data) => ({
	type: ADD_PET,
	payload: data,
});

export const MODIFY_PET = "pets/MODIFY_PET";
export const modifyPet = (data) => ({
	type: MODIFY_PET,
	payload: data,
});

export const DELETE_PET = "pets/DELETE_PET";
export const deletePet = (data) => ({
	type: DELETE_PET,
	payload: data,
});

// ---------------- Reports ------------------

export const SET_REPORTS = "pets/SET_REPORTS";
export const setReports = (data) => ({
	type: SET_REPORTS,
	payload: data,
});

export const SORT_REPORTS = "pets/SORT_REPORTS";
export const sortReports = (data) => ({
	type: SORT_REPORTS,
	payload: data,
});

export const ADD_REPORT_TO_PET = "pets/ADD_REPORT_TO_PET";
export const addReportToPet = (data) => ({
	type: ADD_REPORT_TO_PET,
	payload: data,
});

export const MODIFY_REPORT = "pets/MODIFY_REPORT";
export const modifyReport = (data) => ({
	type: MODIFY_REPORT,
	payload: data,
});

// ---------------- Sync status ---------------

// Sync list

export const SYNC_START = "pets/SYNC_START";
export const syncStart = (data) => ({
	type: SYNC_START,
	payload: data,
});
export const SYNC_SUCCESS = "pets/SYNC_SUCCESS";
export const syncSuccess = (data) => ({
	type: SYNC_SUCCESS,
	payload: data,
});
export const UP_TO_DATE = "pets/UP_TO_DATE";
export const upToDate = (data) => ({
	type: UP_TO_DATE,
	payload: data,
});
export const SYNC_FAIL = "pets/SYNC_FAIL";
export const syncFail = (data) => ({
	type: SYNC_FAIL,
	payload: data,
});

// Add pet to list

export const ADD_START = "pets/ADD_START";
export const addStart = () => ({
	type: ADD_START,
});
export const ADD_SUCCESS = "pets/ADD_SUCCESS";
export const addSuccess = () => ({
	type: ADD_SUCCESS,
});
export const ADD_FAIL = "pets/ADD_FAIL";
export const addFail = () => ({
	type: ADD_FAIL,
});

// Update pet (POST)

export const UPDATE_START = "pets/UPDATE_START";
export const updateStart = () => ({
	type: UPDATE_START,
});
export const UPDATE_SUCCESS = "pets/UPDATE_SUCCESS";
export const updateSuccess = () => ({
	type: UPDATE_SUCCESS,
});
export const UPDATE_FAIL = "pets/UPDATE_FAIL";
export const updateFail = () => ({
	type: UPDATE_FAIL,
});

// Delete pet from list

export const DELETE_START = "pets/DELETE_START";
export const deleteStart = () => ({
	type: DELETE_START,
});
export const DELETE_SUCCESS = "pets/DELETE_SUCCESS";
export const deleteSuccess = () => ({
	type: DELETE_SUCCESS,
});
export const DELETE_FAIL = "pets/DELETE_FAIL";
export const deleteFail = () => ({
	type: DELETE_FAIL,
});

// Send pet report

export const SEND_REPORT_START = "pets/SEND_REPORT_START";
export const sendReportStart = (data) => ({
	type: SEND_REPORT_START,
	payload: data,
});
export const SEND_REPORT_SUCCESS = "pets/SEND_REPORT_SUCCESS";
export const sendReportSuccess = (data) => ({
	type: SEND_REPORT_SUCCESS,
	payload: data,
});
export const SEND_REPORT_FAIL = "pets/SEND_REPORT_FAIL";
export const sendReportFail = (data) => ({
	type: SEND_REPORT_FAIL,
	payload: data,
});

// Sync pet reports

export const SYNC_REPORTS_START = "pets/SYNC_REPORTS_START";
export const syncReportsStart = (data) => ({
	type: SYNC_REPORTS_START,
	payload: data,
});
export const SYNC_REPORTS_SUCCESS = "pets/SYNC_REPORTS_SUCCESS";
export const syncReportsSuccess = (data) => ({
	type: SYNC_REPORTS_SUCCESS,
	payload: data,
});
export const REPORTS_UP_TO_DATE = "pets/REPORTS_UP_TO_DATE";
export const reportsUpToDate = (data) => ({
	type: REPORTS_UP_TO_DATE,
	payload: data,
});
export const SYNC_REPORTS_FAIL = "pets/SYNC_REPORTS_FAIL";
export const syncReportsFail = (data) => ({
	type: SYNC_REPORTS_FAIL,
	payload: data,
});
