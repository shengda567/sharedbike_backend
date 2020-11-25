const express = require("express");
const app = express();
const configRoutes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.json());
app.use(cors());
app.use(cookieParser("express_react_cookie"));
app.use(
  session({
    secret: "express_react_cookie",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 * 30 }, //过期时间
  })
);

configRoutes(app);

app.listen(3001, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3001");
});
