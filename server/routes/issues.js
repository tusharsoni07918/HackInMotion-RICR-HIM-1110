const express = require("express");
const mongoose = require("mongoose");

const Issue = require("../models/Issue");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================================================
   GET ALL ISSUES
   GET /api/issues

   LOGGED-IN USERS ONLY
========================================================= */

router.get("/", protect, async (req, res) => {
  try {
    const issues = await Issue.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: issues.length,
      issues,
    });
  } catch (error) {
    console.error("Error fetching issues:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch issues",
    });
  }
});


/* =========================================================
   CREATE NEW ISSUE
   POST /api/issues

   LOGGED-IN CITIZEN ONLY
========================================================= */

router.post("/", protect, async (req, res) => {
  try {
    /* =====================================================
       CHECK USER
    ===================================================== */

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    /* =====================================================
       ROLE CHECK

       Admin can manage issues but reporting is intended
       for citizens.
    ===================================================== */

    if (req.user.role !== "citizen") {
      return res.status(403).json({
        success: false,
        message: "Only registered citizens can report issues",
      });
    }


    /* =====================================================
       GET BODY
    ===================================================== */

    const {
      title,
      category,
      description,
      location,
      priority,
    } = req.body;


    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Issue title is required",
      });
    }


    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Issue category is required",
      });
    }


    if (
      !description ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Issue description is required",
      });
    }


    if (
      !location ||
      location.lat === undefined ||
      location.lng === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Issue location is required",
      });
    }


    /* =====================================================
       LOCATION VALIDATION
    ===================================================== */

    const lat = Number(location.lat);
    const lng = Number(location.lng);

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid issue location",
      });
    }


    /* =====================================================
       PRIORITY VALIDATION
    ===================================================== */

    const allowedPriorities = [
      "low",
      "medium",
      "high",
    ];

    const finalPriority =
      priority || "low";

    if (!allowedPriorities.includes(finalPriority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority",
      });
    }


    /* =====================================================
       CREATE ISSUE
    ===================================================== */

    const issueData = {
      title: title.trim(),

      category,

      description: description.trim(),

      location: {
        lat,
        lng,
      },

      priority: finalPriority,

      status: "Reported",
    };


    /* =====================================================
       SAVE USER ID IF YOUR ISSUE MODEL SUPPORTS IT
       
       IMPORTANT:
       This requires `reportedBy` in models/Issue.js
    ===================================================== */

    if (req.user._id) {
      issueData.reportedBy = req.user._id;
    }


    const issue = await Issue.create(issueData);


    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    res.status(201).json({
      success: true,
      message: "Issue reported successfully",
      issue,
    });

  } catch (error) {
    console.error("Error creating issue:", error);

    res.status(500).json({
      success: false,
      message: "Failed to report issue",
    });
  }
});


/* =========================================================
   GET SINGLE ISSUE
   GET /api/issues/:id

   LOGGED-IN USERS ONLY
========================================================= */

router.get("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid issue ID",
      });
    }

    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.json({
      success: true,
      issue,
    });

  } catch (error) {
    console.error("Error fetching issue:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch issue",
    });
  }
});


/* =========================================================
   UPDATE ISSUE
   PUT /api/issues/:id

   ADMIN ONLY
========================================================= */

router.put(
  "/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid issue ID",
        });
      }

      const {
        title,
        category,
        description,
        location,
        priority,
        status,
      } = req.body;

      const updateData = {};


      /* TITLE */

      if (title !== undefined) {
        if (
          typeof title !== "string" ||
          !title.trim()
        ) {
          return res.status(400).json({
            success: false,
            message: "Issue title cannot be empty",
          });
        }

        updateData.title = title.trim();
      }


      /* CATEGORY */

      if (category !== undefined) {
        updateData.category = category;
      }


      /* DESCRIPTION */

      if (description !== undefined) {
        if (
          typeof description !== "string" ||
          !description.trim()
        ) {
          return res.status(400).json({
            success: false,
            message: "Issue description cannot be empty",
          });
        }

        updateData.description =
          description.trim();
      }


      /* PRIORITY */

      if (priority !== undefined) {
        const allowedPriorities = [
          "low",
          "medium",
          "high",
        ];

        if (!allowedPriorities.includes(priority)) {
          return res.status(400).json({
            success: false,
            message: "Invalid priority",
          });
        }

        updateData.priority = priority;
      }


      /* STATUS */

      if (status !== undefined) {
        const allowedStatuses = [
          "Reported",
          "Assigned",
          "In Progress",
          "Resolved",
        ];

        if (!allowedStatuses.includes(status)) {
          return res.status(400).json({
            success: false,
            message: "Invalid status",
          });
        }

        updateData.status = status;
      }


      /* LOCATION */

      if (location !== undefined) {
        if (
          location.lat === undefined ||
          location.lng === undefined
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid issue location",
          });
        }

        const lat = Number(location.lat);
        const lng = Number(location.lng);

        if (
          !Number.isFinite(lat) ||
          !Number.isFinite(lng)
        ) {
          return res.status(400).json({
            success: false,
            message: "Invalid issue location",
          });
        }

        updateData.location = {
          lat,
          lng,
        };
      }


      /* =====================================================
         UPDATE
      ===================================================== */

      const issue =
        await Issue.findByIdAndUpdate(
          id,
          updateData,
          {
            new: true,
            runValidators: true,
          }
        );


      if (!issue) {
        return res.status(404).json({
          success: false,
          message: "Issue not found",
        });
      }


      res.json({
        success: true,
        message: "Issue updated successfully",
        issue,
      });

    } catch (error) {
      console.error("Error updating issue:", error);

      res.status(500).json({
        success: false,
        message: "Failed to update issue",
      });
    }
  }
);


/* =========================================================
   DELETE ISSUE
   DELETE /api/issues/:id

   ADMIN ONLY
========================================================= */

router.delete(
  "/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid issue ID",
        });
      }

      const issue =
        await Issue.findByIdAndDelete(id);

      if (!issue) {
        return res.status(404).json({
          success: false,
          message: "Issue not found",
        });
      }

      res.json({
        success: true,
        message: "Issue deleted successfully",
        issue,
      });

    } catch (error) {
      console.error("Error deleting issue:", error);

      res.status(500).json({
        success: false,
        message: "Failed to delete issue",
      });
    }
  }
);


module.exports = router;