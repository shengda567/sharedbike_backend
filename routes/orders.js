const express = require("express");
const router = express.Router();
const data = require("../data");
const ordersData = data.orders;

let { ObjectId } = require("mongodb");

router.get("/:id", async (req, res) => {
  try {
    let id = ObjectId(req.params.id);
    const order = await ordersData.getOrder(id);
    res.json(order);
  } catch (e) {
    res.status(404).json({ error: "order not found" });
  }
});

router.get("/tag/:tag", async (req, res) => {
  const postList = await postData.getPostsByTag(req.params.tag);
  res.json(postList);
});

router.get("/", async (req, res) => {
  try {
    const ordersList = await ordersData.getAllCitiesInformation();
    res.json(ordersList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/", async (req, res) => {
  const orderPostData = req.body;

  try {
    const { city_name, start_time, end_time, status } = orderPostData;
    const searchList = await ordersData.findCitiesBySearchButton(
      city_name,
      start_time,
      end_time,
      status
    );
    res.json(searchList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/complete", async (req, res) => {
  const requestBody = req.body;
  let updatedObject = {};
  try {
    //const { username, status, gender, birthday, address } = employeePostData;
    let parsedId = ObjectId(requestBody._id);
    const oldEmployee = await ordersData.getOrder(parsedId);

    if (requestBody.status && requestBody.status !== "completed") {
      updatedObject.status = "completed";
    }

    if (Object.keys(updatedObject).length !== 0) {
      const updatedEmployee = await ordersData.completeOrder(
        requestBody._id,
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
