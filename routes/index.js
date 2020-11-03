const citiesRoutes = require('./cities');


const constructorMethod = (app) => {
  app.use('/city', citiesRoutes);//%23表示#
 

  // app.use('*', (req, res) => {
  //   res.sendStatus(404);
  // });
};

module.exports = constructorMethod;
