const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    /// Connect to the database
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);

  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
}

module.exports = {connectDB}