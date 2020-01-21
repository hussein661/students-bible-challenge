const express = require("express");
const School = require("../models/School");
const Level = require("../models/Level");

const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/getAllSchools", async (req, res) => {
  try {
    const schools = await School.find();
    res.send({ schools });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/addSchool", auth, async (req, res) => {
  try {
    const { name, education } = req.body;
    const school = new School({ name, education });
    await school.save();
    res.send(school);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
