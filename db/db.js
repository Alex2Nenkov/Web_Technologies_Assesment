const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/contact.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the assessment database.");
  }
});

module.exports = db;
