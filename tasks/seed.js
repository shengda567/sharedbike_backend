const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const cities = data.cities;
const users = data.users;
const employees = data.employees;
const orders = data.orders;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  await cities.create(
    "Jersey City",
    2,
    2,
    77,
    "Lime1",
    [{ user_name: "Steven Davis", user_id: 10001 }],
    "2006-06-06 07:47:27",
    "Christopher Johnson",
    1520476737000
  );

  await cities.create(
    "Hoboken",
    1,
    1,
    77,
    "Lime1",
    [{ user_name: "Steven Davis2", user_id: 10002 }],
    "2006-06-06 07:47:27",
    "Christopher Johnson",
    1520476737000
  );

  await cities.create(
    "New York",
    2,
    1,
    77,
    "Lime2",
    [{ user_name: "Steven Davis3", user_id: 10003 }],
    "2006-06-06 07:47:27",
    "Christopher Johnson",
    1520476737000
  );

  await users.addUser(
    "shengda",
    "shengda",
    "male",
    30,
    "manager",
    "playing games",
    true,
    "1990-02-08",
    "81 graham street"
  );

  await users.addUser(
    "shengda1",
    "shengda1",
    "male",
    30,
    "employee",
    "playing games",
    true,
    "1990-02-08",
    "81 graham street"
  );

  await users.addUser(
    "shengda2",
    "shengda2",
    "male",
    30,
    "administrator",
    "playing games",
    true,
    "1990-02-08",
    "81 graham street"
  );

  await orders.create(
    "hoboken",
    "T180244417",
    "800116090",
    908352,
    "shengda",
    "13353143981",
    8,
    7,
    "locked",
    "2020-12-02",
    "2020-12-04",
    7,
    4,
    [
      [-74.023733, 40.745183],
      [-74.02418874329523, 40.74533192862112],
      [-74.02499340591943, 40.74422646234828],
      [-74.02703188456744, 40.74311284906907],
      [-74.02742090172202, 40.741906102137754],
      [-74.028381, 40.742026],
      [-74.03019417556601, 40.73603480967333],
      [-74.02666438885446, 40.73548200157313],
    ]
  );

  await orders.create(
    "jersey city",
    "T180244418",
    "800116091",
    908353,
    "shengda1",
    "13353143982",
    8,
    7,
    "locked",
    "2020-12-01",
    "2020-12-03",
    7,
    4,
    []
  );

  await orders.create(
    "princeton",
    "T180244419",
    "800116092",
    908354,
    "shengda2",
    "13353143983",
    8,
    7,
    "locked",
    "2020-12-02",
    "2020-12-03",
    7,
    4,
    []
  );

  console.log("Done seeding database");

  await db.serverConfig.close();
}

main();
