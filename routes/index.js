const citiesRoutes = require("./cities");
const usersRoutes = require("./users");
const loginRoutes = require("./login");

const constructorMethod = (app) => {
  app.use("/city", citiesRoutes); //%23表示#
  app.use("/users", usersRoutes);
  app.use("/login", loginRoutes);

  // app.use('*', (req, res) => {
  //   res.sendStatus(404);
  // });
};

module.exports = constructorMethod;
