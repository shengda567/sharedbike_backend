const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
let { ObjectId } = require("mongodb");
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

  getEmployee: async (username, status) => {
    if (username === undefined) throw "You must provide an username";
    if (status === undefined) throw "You must provide an status";
    const employeesCollection = await users();
    const empoyee = await employeesCollection.findOne({
      username: username,
      status: status,
    });

    if (!empoyee) {
      throw "Could not find employee with name of " + username;
    }
    return empoyee;
  },

  findEmployessBySearchButton: async (username, status) => {
    if (!username || !status) throw "You must provide all search options";

    const employeesCollection = await users();

    return await employeesCollection
      .findOne({
        $and: [{ username: username }, { status: status }],
      })
      .toArray();
  },

  findEmployessByUsernameAndBirthDay: async (username) => {
    if (!username) throw "You must provide all search options";

    const employeesCollection = await users();
    // let tIndex = birthday.indexOf("T");
    // birthday = birthday.substring(0, tIndex);

    return await employeesCollection.findOne({
      username: username,
    });
  },

  async addEmployees(username, gender, status, birthday, address) {
    const userCollection = await users();
    let tIndex = birthday.indexOf("T");
    birthday = birthday.substring(0, tIndex);

    let parsedGender = gender == 2 ? "F" : "M";

    const obj = {
      1: "Entrepreneur",
      2: "Employee",
      3: "Engineer",
      4: "Manager",
      5: "Administrator",
    };

    let parsedStatus = obj[status];

    let newUser = {
      username,
      gender: parsedGender,
      status: parsedStatus,
      birthday,
      address,
      //_id: uuid(),
    };

    const newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
    return await this.getUserById(newInsertInformation.insertedId);
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
    let tIndex = birthday.indexOf("T");
    birthday = birthday.substring(0, tIndex);

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

  async updateEmployee(id, updatedEmployee) {
    const userCollection = await users();

    const updatedPostData = {};

    if (updatedEmployee.username) {
      updatedPostData.username = updatedEmployee.username;
    }

    if (updatedEmployee.status) {
      updatedPostData.status = updatedEmployee.status;
    }

    if (updatedEmployee.gender) {
      updatedPostData.gender = updatedEmployee.gender;
    }
    if (updatedEmployee.birthday) {
      let tIndex = updatedEmployee.birthday.indexOf("T");
      if (tIndex == -1) {
        updatedPostData.birthday = updatedEmployee.birthday;
      } else {
        updatedEmployee.birthday = updatedEmployee.birthday.substring(
          0,
          tIndex
        );
        updatedPostData.birthday = updatedEmployee.birthday;
      }

      updatedPostData.birthday = updatedEmployee.birthday;
    }
    if (updatedEmployee.address) {
      updatedPostData.address = updatedEmployee.address;
    }

    await userCollection.updateOne({ _id: id }, { $set: updatedPostData });

    return await this.getUserById(id);
  },

  async removeEmployee(id) {
    const userCollection = await users();
    let user = null;
    let parsedId = ObjectId(id);
    try {
      user = await this.getUserById(parsedId);
    } catch (e) {
      console.log(e);
      return;
    }
    const deletionInfo = await userCollection.removeOne({ _id: parsedId });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete user with id of ${id}`;
    }
    //await users.removePostFromUser(post.poster.id, id);
    return true;
  },
};

module.exports = exportedMethods;
