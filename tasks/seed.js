const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const cities = data.cities;


async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  await cities.create(
    "Jersey City",
    2,
    2,
    77,
    "Lime",
    [{user_name: "Steven Davis",
      user_id: 10001}
    ],
    "2006-06-06 07:47:27",
    "Christopher Johnson",
    1520476737000
  );

  await cities.create(
    "Hoboken",
    1,
    1,
    77,
    "Lime",
    [{user_name: "Steven Davis2",
      user_id: 10002}
    ],
    "2006-06-06 07:47:27",
    "Christopher Johnson",
    1520476737000
  );

  await cities.create(
    "New York",
    2,
    1,
    77,
    "Lime",
    [{user_name: "Steven Davis3",
      user_id: 10003}
    ],
    "2006-06-06 07:47:27",
    "Christopher Johnson",
    1520476737000
  );
  




  

  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();