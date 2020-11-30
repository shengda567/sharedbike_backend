const mongoCollections = require("../config/mongoCollections");
const orders = mongoCollections.orders;
let { ObjectId } = require("mongodb");

module.exports = {
  getAllCitiesInformation: async () => {
    const ordersCollection = await orders();
    const ordersList = await ordersCollection.find({}).toArray();
    return ordersList;
  },

  // more simple stuff
  getOrder: async (id) => {
    if (id === undefined) throw "You must provide an ID";
    const ordersCollection = await orders();
    const order = await ordersCollection.findOne({ _id: id });

    if (!order) {
      throw "Could not find order with id of " + id;
    }
    return order;
  },

  findCitiesBySearchButton: async (cityName, start_time, end_time, status) => {
    if (!cityName || !start_time || !end_time || !status)
      throw "You must provide all search options";

    const ordersCollection = await orders();

    return await ordersCollection
      .find({
        $and: [
          { city_name: cityName },
          { start_time: start_time },
          { end_time: end_time },
          { status: status },
        ],
      })
      .toArray();
  },

  // this is a VERY slow operation;
  // it has to traverse the whole collection
  searchByJavaScriptQuery: async (keyword) => {
    if (!keyword) throw "You must provide a keyword";
    const citiesCollection = await cities();
    return await citiesCollection
      .find({
        $where: "this.title.toLowerCase().indexOf('" + keyword + "') >= 0",
      })
      .toArray();
  },

  async create(
    city_name,
    order_sn,
    bike_sn,
    user_id,
    user_name,
    mobile,
    distance,
    total_time,
    status,
    start_time,
    end_time,
    total_fee,
    user_pay,
    routeList
  ) {
    if (
      typeof city_name === "undefined" ||
      typeof order_sn === "undefined" ||
      typeof bike_sn === "undefined" ||
      typeof user_id === "undefined" ||
      typeof user_name === "undefined" ||
      typeof mobile === "undefined" ||
      typeof distance === "undefined" ||
      typeof total_time === "undefined" ||
      typeof status === "undefined" ||
      typeof start_time === "undefined" ||
      typeof end_time === "undefined" ||
      typeof total_fee === "undefined" ||
      typeof user_pay === "undefined" ||
      typeof routeList === "undefined"
    ) {
      throw new Error("All fields need to have valid values");
    }

    const ordersCollection = await orders();

    const newOrder = {
      city_name,
      order_sn,
      bike_sn,
      user_id,
      user_name,
      mobile,
      distance,
      total_time,
      status,
      start_time,
      end_time,
      total_fee,
      user_pay,
      routeList,
    };

    const insertInfo = await ordersCollection.insertOne(newOrder);
    if (insertInfo.insertedCount === 0) throw "Could not add new order";

    const newId = insertInfo.insertedId;

    const order = await ordersCollection.findOne({ _id: newId });
    //book._id = book._id.toString();
    return order;
  },

  async completeOrder(id, updatedEmployee) {
    const ordersCollection = await orders();

    const updatedPostData = {};

    if (updatedEmployee.status) {
      updatedPostData.status = updatedEmployee.status;
    }
    let parsedId = ObjectId(id);

    await ordersCollection.updateOne(
      { _id: parsedId },
      { $set: updatedPostData }
    );

    return await this.getOrder(parsedId);
  },
};
