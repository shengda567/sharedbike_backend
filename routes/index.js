const citiesRoutes = require("./cities");
const usersRoutes = require("./users");
const loginRoutes = require("./login");
const employeesRoutes = require("./employees");
const ordersRoutes = require("./orders");

const constructorMethod = (app) => {
  app.use("/city", citiesRoutes); //%23表示#
  app.use("/users", usersRoutes);
  app.use("/login", loginRoutes);
  app.use("/employees", employeesRoutes);
  app.use("/orders", ordersRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
