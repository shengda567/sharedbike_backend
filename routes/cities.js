const express = require('express');
const router = express.Router();
const data = require('../data');
const citiesData = data.cities;

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

router.get('/', async (req, res) => {
  try {
    const citiesList = await citiesData.getAllCitiesInformation();
    res.json(citiesList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post('/', async (req, res) => {
  const cityPostData = req.body;
  if (!cityPostData.city_name) {
    res.status(400).json({ error: 'You must provide city name' });
    return;
  }
  if (!cityPostData.mode) {
    res.status(400).json({ error: 'You must provide city mode' });
    return;
  }
  if (!cityPostData.op_mode) {
    res.status(400).json({ error: 'You must provide city op_mode' });
    return;
  }
  if (!cityPostData.franchisee_name) {
    res.status(400).json({ error: 'You must provide city franchisee_name.' });
    return;
  }
  try {
    const { city_name, mode, op_mode, franchisee_name } = cityPostData;
    const searchList = await citiesData.findCitiesBySearchButton(city_name, mode, op_mode, franchisee_name);
    res.json(searchList);
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
