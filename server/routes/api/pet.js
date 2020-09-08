const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/user");
const Pet = require("../../models/pet");
const utils = require("./pet-utils");

const { filterPet } = utils;

const router = express.Router();

// ------------------- Create pet -------------------
// Access: token
// Returns: new pet ID and user dateModified

router.post("/create", auth, async (req, res) => {
	try {
		const { userId, body } = req;

		// Validate
		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json("User doesn't exist");

		// Create Pet doc
		const dateCreated = new Date();
		const reportIds = [];
		const formData = filterPet(body);
		const saveData = { ...formData, userId, reportIds, dateCreated };
		const savedPet = await new Pet(saveData).save();
		if (!savedPet) throw Error("Error saving the pet");
		const { id } = savedPet;

		// Update user petIds & dateModified
		user.petIds.push(id);
		user.dateModified = dateCreated;
		user.save(); // no async

		// Send response
		res.status(200).json({ id, dateCreated });
	} catch (e) {
		res.status(500).json(e.message);
	}
});
// ------------------- Update pet -------------------
// Access: token
// Returns: dateModified

router.post("/update", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { id, formData } = body;

		// Validate
		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json("User doesn't exist");

		const dateUpdated = new Date();
		const update = { ...filterPet(formData), dateUpdated };
		const pet = await Pet.findByIdAndUpdate(id, update);
		if (!pet) return res.status(404).json("Pet doesn't exist");

		// Update user dateModified
		user.dateModified = dateUpdated;
		user.save(); // no async

		// Send response
		res.status(200).json({ dateUpdated });
	} catch (e) {
		res.status(500).json(e.message);
	}
});
// ------------------- Delete pet -------------------
// Access: token
// Returns: dateModified

router.delete("/:id", auth, async (req, res) => {
	try {
		const { userId, params } = req;
		const { id } = params;

		// Validate
		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json("User doesn't exist");

		const petRes = await Pet.findByIdAndRemove(id);
		if (!petRes) return res.status(404).json("Pet doesn't exist");

		// Update user dateModified
		const dateModified = new Date();
		user.dateModified = dateModified;
		user.save(); // no async

		// Send response
		res.status(200).json({ dateModified });
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// ----------------------------------------------------------------

module.exports = router;
