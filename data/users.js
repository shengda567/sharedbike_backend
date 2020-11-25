const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
//const uuid = require('uuid/v4');

let exportedMethods = {
  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    if (!userList) throw "No users in system!";
    return userList;
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  async getUserById(id) {
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    if (!user) throw "User not found";
    return user;
  },
  async addUser(
    username,
    password,
    gender,
    age,
    status,
    hobby,
    marriage,
    birthday,
    address
  ) {
    const userCollection = await users();

    let newUser = {
      username,
      password,
      gender,
      age,
      status,
      hobby,
      marriage,
      birthday,
      address,
      //_id: uuid(),
    };

    const newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
    return await this.getUserById(newInsertInformation.insertedId);
  },
  async removeUser(id) {
    const userCollection = await users();
    const deletionInfo = await userCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete user with id of ${id}`;
    }
    return true;
  },

  async addOrderToUser(userId, orderId, orderTitle) {
    let currentUser = await this.getUserById(userId);
    console.log(currentUser);

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      { _id: userId },
      { $addToSet: { order: { id: orderId, title: orderTitle } } }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw "Update failed";

    return await this.getUserById(userId);
  },
};

module.exports = exportedMethods;
