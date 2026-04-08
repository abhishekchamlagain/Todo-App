const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// routes
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);


(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (err) {
        console.error('DB connection failed:', err);
        process.exit(1);
    }
})();

