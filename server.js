require("dotenv").config();   // 🔴 MUST be first

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const inquiryRoutes = require("./routes/inquiryRoutes");

const app = express();

// Connect MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/inquiry", inquiryRoutes);

const PORT = 5000;
const HOST = "192.168.1.19";

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});
