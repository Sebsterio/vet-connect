import * as $ from "./error-actions";

// const ERROR_TIMEOUT = 5000;

export const error = (data) => (dispatch) => {
	dispatch($.setError(data));
	// setTimeout(() => {
	// 	dispatch($.clearError("auto-clean-up"));
	// }, ERROR_TIMEOUT);
};
