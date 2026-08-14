const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const issueRoutes = require("./routes/issues");
const authRoutes = require("./routes/auth");



dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;


/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


/* =========================
   ROUTES
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CivicGuardian Backend is running",
  });
});

app.use("/api/issues", issueRoutes);
app.use("/api/auth", authRoutes);


/* =========================
   DATABASE + SERVER
========================= */

const startServer = async () => {

  try {

    if (process.env.MONGO_URI) {

      await connectDB();

      console.log("Database connected");

    } else {

      console.log(
        "MONGO_URI not found - running without database"
      );

    }


    app.listen(PORT, () => {

      console.log(
        `Server running on http://localhost:${PORT}`
      );

    });

  } catch (error) {

    console.error(
      "Server startup failed:",
      error.message
    );

  }

};


startServer();