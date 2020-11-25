const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const { responseClient } = require("../util");

router.post("/", async (req, res) => {
  let userInfo = req.body;
  if (!userInfo) {
    responseClient(res, 400, 2, "username can not be empty.");
    return;
  }

  if (!userInfo.username) {
    responseClient(res, 400, 2, "password can not be empty.");
    return;
  }

  //let searchResult = false;
  try {
    const newUser = await userData.getAllUsers();
    for (let i in newUser) {
      console.log(newUser[i]);
      if (
        newUser[i].username == userInfo.username &&
        newUser[i].password == userInfo.password
      ) {
        //searchResult = true;
        let data = {};
        data.username = newUser[i].username;
        data.userId = newUser[i]._id;
        data.password = newUser[i].password;
        //登录成功后设置session
        req.session.userInfo = data;
        responseClient(res, 200, 0, "login successfully.", data);
        return;
      }
    }
    responseClient(res, 400, 1, "username or password is not valid.");
  } catch (e) {
    responseClient(res);
  }
});
module.exports = router;
