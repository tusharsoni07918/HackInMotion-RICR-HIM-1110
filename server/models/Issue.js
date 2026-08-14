const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    /* =====================================================
       ISSUE TITLE
    ===================================================== */

    title: {
      type: String,
      required: true,
      trim: true,
    },


    /* =====================================================
       CATEGORY
    ===================================================== */

    category: {
      type: String,
      required: true,
      trim: true,
    },


    /* =====================================================
       DESCRIPTION
    ===================================================== */

    description: {
      type: String,
      required: true,
      trim: true,
    },


    /* =====================================================
       LOCATION
    ===================================================== */

    location: {
      lat: {
        type: Number,
        required: true,
      },

      lng: {
        type: Number,
        required: true,
      },
    },


    /* =====================================================
       PRIORITY
    ===================================================== */

    priority: {
      type: String,

      enum: [
        "low",
        "medium",
        "high",
      ],

      default: "low",
    },


    /* =====================================================
       STATUS
    ===================================================== */

    status: {
      type: String,

      enum: [
        "Reported",
        "Assigned",
        "In Progress",
        "Resolved",
      ],

      default: "Reported",
    },


    /* =====================================================
       REPORTED BY
       
       Stores the logged-in citizen's User ID
    ===================================================== */

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },
  },


  /* =======================================================
     TIMESTAMPS
  ======================================================= */

  {
    timestamps: true,
  }
);


module.exports = mongoose.model(
  "Issue",
  issueSchema
);