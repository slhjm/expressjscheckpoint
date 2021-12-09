//imports
const express = require("express");
const server = express();
const port = 2000;

//static files
server.use(express.static("public"));
server.use("/stylesheets", express.static(__dirname + "public/stylesheets"));
server.use("/images", express.static(__dirname + "public/images"));
//set views

server.set("views", "./views");
server.set("view engine", "ejs");

// Time Middleware
const verifyTime = (req, res, next) => {
  let time = new Date();
  if (
    time.getDay() <= 5 &&
    time.getDay() >= 1 &&
    time.getHours() <= 17 &&
    time.getHours() >= 9
  ) {
    console.log("We are open");
    next();
  } else console.log("We are closed");
  res.render("closed"), { time: time.toUTCString() };
};

server.get("", verifyTime, (req, res) => {
  res.render("index", { text: "  Home page" });
});

server.get("/contact", verifyTime, (req, res) => {
  res.render("contact", { text: "contact page" });
});

server.get("/services", verifyTime, (req, res) => {
  res.render("services", { text: "services page" });
});

server.get("/services/moreinfo", verifyTime, (req, res) => {
  res.render("burger");
});

//middleware

server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
