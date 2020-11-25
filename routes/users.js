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

router.get("/", async (req, res) => {
  try {
    let usersList = await userData.getAllUsers();
    res.json(usersList);
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

  try {
    let newUser = await userData.addUser(
      userInfo.username,
      userInfo.password,
      userInfo.gender,
      userInfo.age,
      userInfo.status,
      userInfo.hobby,
      userInfo.marriage,
      userInfo.birthday,
      userInfo.address
    );
    res.json(newUser);

    //res.redirect("posts/");
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
