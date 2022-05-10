const mongoose = require("mongoose");

(async () => {
  try {
    const db = await mongoose.connect("mongodb://localhost/notes-db-app");
    console.log("DB is connected");
  } catch (error) {
    console.error(error);
  }
})();
