const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


/* =========================================================
   JWT SECRET
========================================================= */

const getJWTSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return process.env.JWT_SECRET;
};


/* =========================================================
   REGISTER USER
   POST /api/auth/register
========================================================= */

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;


    /* =========================
       VALIDATION
    ========================= */

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }


    /* =========================
       CLEAN EMAIL
    ========================= */

    const cleanEmail = email
      .toLowerCase()
      .trim();


    /* =========================
       CHECK EXISTING USER
    ========================= */

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }


    /* =========================
       HASH PASSWORD
    ========================= */

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    /* =========================
       CREATE USER
       
       Public registration creates
       CITIZEN accounts only.
    ========================= */

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: "citizen",
    });


    /* =========================
       RESPONSE
    ========================= */

    res.status(201).json({
      success: true,
      message: "Account created successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.error(
      "Registration error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create account",
    });
  }
});


/* =========================================================
   LOGIN USER
   POST /api/auth/login
========================================================= */

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;


    /* =========================
       VALIDATION
    ========================= */

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }


    /* =========================
       FIND USER
    ========================= */

    const cleanEmail = email
      .toLowerCase()
      .trim();

    const user = await User.findOne({
      email: cleanEmail,
    });


    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }


    /* =========================
       CHECK PASSWORD
    ========================= */

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }


    /* =========================
       CHECK ROLE
    ========================= */

    if (
      role &&
      user.role !== role
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized for this role",
      });
    }


    /* =========================
       JWT SECRET
    ========================= */

    let JWT_SECRET;

    try {
      JWT_SECRET = getJWTSecret();
    } catch (error) {

      console.error(error.message);

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration error",
      });
    }


    /* =========================
       CREATE JWT
    ========================= */

    const token = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role,
      },

      JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );


    /* =========================
       LOGIN SUCCESS
    ========================= */

    res.json({
      success: true,
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.error(
      "Login error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});


/* =========================================================
   EXPORT ROUTER
========================================================= */

module.exports = router;