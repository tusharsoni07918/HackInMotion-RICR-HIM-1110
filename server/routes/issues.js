const express = require("express");
const Issue = require("../models/Issue");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      location,
      priority,
      photo,
    } = req.body;

    if (
      !title ||
      !category ||
      !description ||
      !location ||
      location.lat === undefined ||
      location.lng === undefined
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const issue = await Issue.create({
      title,
      category,
      description,
      location,
      priority,
      photo: photo || "",
    });

    res.status(201).json({
      message: "Issue reported successfully",
      issue,
    });
  } catch (error) {
    console.error(
      "Failed to report issue:",
      error
    );

    res.status(500).json({
      message: "Failed to report issue",
      error: error.message,
    });
  }
});

module.exports = router;