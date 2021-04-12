const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MangoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.log(`Database Connection Error: ${error}`);
    process.exit(); // end of process in nodejs
  }
};

module.exports = connectDB;
