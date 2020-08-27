import {
	makeArrayWithPushedItems,
	makeArrayWithRemovedItems,
	makeArrayWithMovedItem,
} from "utils/array";

export const stopPropagation = (e) => e.stopPropagation();

export const getStepsFromDirection = (direction) =>
	direction === "down" ? 1 : direction === "up" ? -1 : 0;

export const makeNestedTargetEvent = (action, sectionName, direction) => ({
	target: { name: "target", action, sectionName, direction },
});

export const makeModifiedAfter = (e, currentAfter) => {
	let { value } = e.target;
	return value.includes("none")
		? !currentAfter.includes("none")
			? ["none"]
			: value.filter((v) => v !== "none")
		: value.includes("all")
		? !currentAfter.includes("all")
			? ["all"]
			: value.filter((v) => v !== "all")
		: value;
};

export const makeModifiedTarget = (e, currentTarget) => {
	const { sectionName, action, direction } = e.target;
	return action === "add"
		? makeArrayWithPushedItems(currentTarget, sectionName)
		: action === "delete"
		? makeArrayWithRemovedItems(currentTarget, sectionName)
		: action === "move"
		? makeArrayWithMovedItem(
				currentTarget,
				sectionName,
				getStepsFromDirection(direction)
		  )
		: currentTarget;
};

// prettier-ignore
export 	const getAlertMessage = (alertCode) => {
	switch (alertCode) {
		case 1:	return "green";
		case 2:	return "yellow";
		case 3:	return "orange";
		case 4:	return "red";
		default: return "none";
	}
};
