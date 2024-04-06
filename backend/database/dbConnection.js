const mongoose = require("mongoose")

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "Find_Your_Job",
      })
      .then(() => {
        console.log("Connected to Database");
      })
      .catch((err) => {
        console.log(`Some Error Occured. ${err}`);
      });
  };

module.exports = dbConnection;