const express = require("express");
const router = express.Router();
const data = require("../data");
const employeesData = data.users;

// router.get('/:id', async (req, res) => {
//   try {
//     const post = await postData.getPostById(req.params.id);
//     res.json(post);
//   } catch (e) {
//     res.status(404).json({ error: 'Post not found' });
//   }
// });

// router.get('/tag/:tag', async (req, res) => {
//   const postList = await postData.getPostsByTag(req.params.tag);
//   res.json(postList);
// });

router.get("/", async (req, res) => {
  try {
    const employeeList = await employeesData.getAllUsers();
    res.json(employeeList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/", async (req, res) => {
  const employeePostData = req.body;
  if (!employeePostData.username) {
    res.status(400).json({ error: "You must provide user name" });
    return;
  }
  if (!employeePostData.status) {
    res.status(400).json({ error: "You must provide status" });
    return;
  }

  try {
    const { username, status } = employeePostData;
    const searchList = await employeesData.findEmployessBySearchButton(
      username,
      status
    );
    res.json(searchList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/update", async (req, res) => {
  const requestBody = req.body;
  let updatedObject = {};
  try {
    //const { username, status, gender, birthday, address } = employeePostData;
    const theUser = await employeesData.findEmployessByUsernameAndBirthDay(
      requestBody.username
    );
    const id = theUser._id;
    const oldEmployee = await employeesData.getUserById(id);

    if (requestBody.username && requestBody.username !== oldEmployee.username)
      updatedObject.username = requestBody.username;
    if (requestBody.status && requestBody.status !== oldEmployee.status)
      updatedObject.status = requestBody.status;
    if (requestBody.sex && requestBody.sex !== oldEmployee.gender)
      updatedObject.gender = requestBody.sex;
    if (requestBody.hobby && requestBody.hobby !== oldEmployee.hobby)
      updatedObject.hobby = requestBody.hobby;
    if (requestBody.marriage && requestBody.marriage !== oldEmployee.marriage)
      updatedObject.marriage = requestBody.marriage;
    if (requestBody.birthday && requestBody.birthday !== oldEmployee.birthday)
      updatedObject.birthday = requestBody.birthday;
    if (requestBody.address && requestBody.address !== oldEmployee.address)
      updatedObject.address = requestBody.address;

    if (Object.keys(updatedObject).length !== 0) {
      const updatedEmployee = await employeesData.updateEmployee(
        id,
        updatedObject
      );
      res.json(updatedEmployee);
    } else {
      res.status(400).json({
        error:
          "No fields have been changed from their inital values, so no update has occurred",
      });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
}),
  router.post("/create", async (req, res) => {
    const userInfo = req.body;

    try {
      let newUser = await employeesData.addEmployees(
        userInfo.username,

        userInfo.sex,

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

router.post("/delete", async (req, res) => {
  const userInfo = req.body;
  const id = userInfo.id;
  try {
    let info = await employeesData.removeEmployee(id);

    res.json(info);

    //res.redirect("posts/");
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// router.put('/:id', async (req, res) => {
//   const updatedData = req.body;
//   if (!updatedData.title || !updatedData.body || !updatedData.posterId) {
//     res.status(400).json({ error: 'You must Supply All fields' });
//     return;
//   }
//   try {
//     await postData.getPostById(req.params.id);
//   } catch (e) {
//     res.status(404).json({ error: 'Post not found' });
//     return;
//   }

//   try {
//     const updatedPost = await postData.updatePost(req.params.id, updatedData);
//     res.json(updatedPost);
//   } catch (e) {
//     res.status(500).json({ error: e });
//   }
// });

// router.patch('/:id', async (req, res) => {
//   const requestBody = req.body;
//   let updatedObject = {};
//   try {
//     const oldPost = await postData.getPostById(req.params.id);
//     if (requestBody.title && requestBody.title !== oldPost.title)
//       updatedObject.title = requestBody.title;
//     if (requestBody.body && requestBody.body !== oldPost.body)
//       updatedObject.body = requestBody.body;
//     if (requestBody.tags && requestBody.tags !== oldPost.tags)
//       updatedObject.tags = requestBody.tags;
//     if (requestBody.posterId && requestBody.posterId !== oldPost.posterId)
//       updatedObject.posterId = requestBody.posterId;
//   } catch (e) {
//     res.status(404).json({ error: 'Post not found' });
//     return;
//   }

//   try {
//     const updatedPost = await postData.updatePost(req.params.id, updatedObject);
//     res.json(updatedPost);
//   } catch (e) {
//     res.status(500).json({ error: e });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   if (!req.params.id) {
//     res.status(400).json({ error: 'You must Supply and ID to delete' });
//     return;
//   }
//   try {
//     await postData.getPostById(req.params.id);
//   } catch (e) {
//     res.status(404).json({ error: 'Post not found' });
//     return;
//   }
//   try {
//     await postData.removePost(req.params.id);
//     res.sendStatus(200);
//   } catch (e) {
//     res.status(500).json({ error: e });
//   }
// });

module.exports = router;
