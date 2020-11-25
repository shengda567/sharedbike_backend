const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.get("/:id", async (req, res) => {
  try {
    let user = await userData.getUserById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: "User not found" });
  }
});

router.get("/userInfo", function (req, res) {
  if (req.session.userInfo) {
    responseClient(res, 200, 0, "", req.session.userInfo);
  } else {
    responseClient(
      res,
      200,
      1,
      "username or password is not valid..",
      req.session.userInfo
    );
  }
});

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

router.post("/", async (req, res) => {
  let userInfo = req.body;

  if (!userInfo) {
    res.status(400).json({ error: "You must provide data to create a user" });
    return;
  }

  if (!userInfo.username) {
    res.status(400).json({ error: "You must provide a username" });
    return;
  }

  if (!userInfo.password) {
    res.status(400).json({ error: "You must provide a password" });
    return;
  }

  let searchResult = false;
  try {
    const newUser = await userData.getAllUsers();
    for (let i in newUser) {
      console.log(newUser[i]);
      if (
        newUser[i].username == userInfo.username &&
        newUser[i].password == userInfo.password
      ) {
        searchResult = true;
      }
    }
    res.json(searchResult);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
