const issueRoutes = require("./routes/issues");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/issues", issueRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error ❌:", error.message);
  });


// Test API
app.get("/", (req, res) => {
  res.json({
    message: "CivicGuardian Backend is running 🚀"
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});