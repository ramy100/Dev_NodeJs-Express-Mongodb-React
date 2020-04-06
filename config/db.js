const mongoose = require('mongoose');
// an installed dependancy that gets value from default.json
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Connected to Db');
  } catch (err) {
    console.log('Failed Connecting to Db');
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
