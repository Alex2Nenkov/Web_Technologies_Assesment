const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("pages/home", {
    title: "Spill Studies - Online Learning Platform",
  });
});

app.get("/courses", (req, res) => {
  res.render("pages/courses");
});

app.get("/instructors", (req, res) => {
  res.render("pages/instructors");
});

app.get("/events", (req, res) => {
  res.render("pages/events");
});

app.get("/faq", (req, res) => {
  res.render("pages/faq");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  try {
    await new Promise((resolve, reject) => {
      const query = "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)";
      db.query(query, [name, email, message], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).send("Your message has been received!");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving your message.");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
