const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    const { host, name } = conn.connection;
    console.log(`Connected to MongoDB: ${host}/${name}`);
    return conn;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};

module.exports = connectDB;