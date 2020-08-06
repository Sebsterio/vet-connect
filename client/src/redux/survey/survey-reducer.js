import { INITIAL_STATE } from "./survey-INITIAL_STATE";
import * as $ from "./survey-actions";
import {
	getStateWithReplacedItems,
	getStateWithPushedItem,
	getStateWithPoppedItem,
	getStateWithRemovedItem,
	getQueueWithShiftedNextLocation,
	getQueueWithUnshiftedLocations,
	getQueueWithInjectedLocations,
	getQueueWithPushedLocations,
} from "./survey-utils";
import {
	arrayify,
	makeArrayWithModifiedItem,
	makeArrayWithAddedUniqueItem,
} from "utils/array";

const surveyReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// --- Survey data ---

		case $.SET_SURVEY_DATA: {
			return {
				...state,
				data: { ...action.payload },
			};
		}

		// --- Location History ---

		case $.PUSH_LOCATION_TO_HISTORY: {
			return getStateWithPushedItem(state, "history", action.payload);
		}
		case $.POP_LOCATION_FROM_HISTORY: {
			return getStateWithPoppedItem(state, "history");
		}

		// --- Current Location ---

		case $.SET_ANSWER_IN_CURRENT_LOCATION: {
			const modifier = (location) => ({ ...location, answer: action.payload });
			return {
				...state,
				history: makeArrayWithModifiedItem(state.history, -1, modifier),
			};
		}
		case $.ADD_ANSWER_IN_CURRENT_LOCATION: {
			const modifier = (location) => ({
				...location,
				answer: makeArrayWithAddedUniqueItem(
					arrayify(location.answer),
					action.payload
				),
			});
			return {
				...state,
				history: makeArrayWithModifiedItem(state.history, -1, modifier),
			};
		}

		// --- Main Queue ---

		case $.SET_QUEUE: {
			return getStateWithReplacedItems(state, "queue", action.payload);
		}
		case $.SHIFT_NEXT_LOCATION_FROM_QUEUE: {
			return {
				...state,
				queue: getQueueWithShiftedNextLocation(state.queue),
			};
		}
		case $.UNSHIFT_LOCATIONS_TO_QUEUE: {
			return {
				...state,
				queue: getQueueWithUnshiftedLocations(state.queue, action.payload),
			};
		}
		case $.INJECT_LOCATIONS_TO_QUEUE: {
			return {
				...state,
				queue: getQueueWithInjectedLocations(state.queue, action.payload),
			};
		}
		case $.PUSH_LOCATIONS_TO_QUEUE: {
			return {
				...state,
				queue: getQueueWithPushedLocations(state.queue, action.payload),
			};
		}

		// --- Optional Queue ---

		case $.SET_OPTIONAL_QUEUE: {
			return getStateWithReplacedItems(state, "optionalQueue", action.payload);
		}
		case $.REMOVE_FROM_OPTIONAL_QUEUE: {
			return getStateWithRemovedItem(state, "optionalQueue", action.payload);
		}

		// ---------------------------

		default:
			return state;
	}
};

export default surveyReducer;
