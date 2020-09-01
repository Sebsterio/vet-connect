const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/user");
const utils = require("./auth-utils");

const { filterUserForExport } = utils;

const router = express.Router();

// ------------------- Sign-up -------------------

router.post("/sign-up", async (req, res) => {
	const { email, password } = req.body;

	// Validate
	if (!email || !password) return res.status(400).json("Missing fields");
	const user = await User.findOne({ email });
	if (user)
		return res.status(403).json({
			target: "email",
			msg: "User already exists",
		});

	try {
		// Get encrypted password
		const salt = await bcrypt.genSalt(10);
		if (!salt) throw Error("Error with bcrypt");
		const hash = await bcrypt.hash(password, salt);
		if (!hash) throw Error("Error hashing the password");

		// Create user
		const dateRegistered = new Date();
		const type = "client";
		const newUser = new User({ email, password: hash, dateRegistered, type });
		const savedUser = await newUser.save();
		if (!savedUser) throw Error("Error saving the user");

		// Generate token
		const token = jwt.sign({ userId: savedUser.id }, process.env.JWT_SECRET);
		if (!token) throw Error("Couldn't sign the token");

		res.status(200).json({ token, ...filterUserForExport(savedUser) });
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// --------------------- Sign-in ---------------------
// access: password

router.post("/sign-in", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validate
		if (!email || !password) return res.status(400).json("Missing credentials");
		const user = await User.findOne({ email });
		if (!user)
			return res.status(403).json({
				target: "email",
				msg: "There's no such user",
			});
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(403).json({
				target: "password",
				msg: "Invalid credentials",
			});

		// Generate new token
		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
		if (!token) throw Error("Couldn't sign the token");

		// Record action (non-blocking; for analytics only)
		user.dateSynced = new Date();
		user.save();

		res.status(200).json({ token, ...filterUserForExport(user) });
	} catch (e) {
		res.status(500).json(e.message);
	}
});

// ------------------ Sync user -----------------
// access: token

router.post("/", auth, async (req, res) => {
	try {
		const { userId, body } = req;

		// Validate
		const user = await User.findById(userId).select("-password");
		if (!user) return res.status(404).json("User doesn't exist");

		// Record action (non-blocking; for analytics only)
		user.dateSynced = new Date();
		user.save();

		// Compare local and remote versions and determine response
		const dateLocal = new Date(body.dateModified).getTime();
		const dateRemote = new Date(user.dateModified).getTime();

		if (dateLocal == dateRemote) return res.status(201).send();
		return res.status(200).json(filterUserForExport(user));
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ----------------- Update user ----------------
// acces: token & password

router.post("/update", auth, async (req, res) => {
	try {
		const { userId, body } = req;
		const { password, newEmail, newPassword, type } = body;

		// Validate credentials
		if (!password) throw Error("Missing credentials");
		const user = await User.findById(userId);
		if (!user) return res.status(404).json("User doesn't exist");
		const passwordsMatch = await bcrypt.compare(password, user.password);
		if (!passwordsMatch)
			return res.status(403).json({
				target: "password",
				msg: "Invalid credentials",
			});

		// Update email
		let { email } = user;
		if (newEmail && newEmail !== email) {
			const foundUser = await User.findOne({ email: newEmail });
			if (foundUser)
				return res.status(403).json({
					target: "newEmail",
					msg: "User already exists",
				});
			user.email = newEmail;
		}

		// Update password
		if (newPassword) {
			const salt = await bcrypt.genSalt(10);
			if (!salt) throw Error("Error with bcrypt");
			const hash = await bcrypt.hash(newPassword, salt);
			if (!hash) throw Error("Error hashing the password");
			user.password = hash;
		}

		// Update rest and save
		if (type && type !== "superuser") user.type = type;
		user.dateModified = new Date();
		await user.save();

		return res.status(200).json(filterUserForExport(user));
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ---------------- Delete user ----------------

router.post("/delete", auth, async (req, res) => {
	try {
		const { password } = req.body;

		// Validate
		if (!password) throw Error("Missing credentials");
		const { userId } = req;
		const user = await User.findById(userId);
		if (!user) throw Error("User does not exist");
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res
				.status(403)
				.json({ target: "password", msg: "Invalid credentials" });

		// Execute and respond
		await User.findByIdAndRemove(userId);
		res.status(200).send();
	} catch (e) {
		res.status(400).json(e.message);
	}
});

// ----------------------------------------------------------------

module.exports = router;
