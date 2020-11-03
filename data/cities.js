const mongoCollections = require('../config/mongoCollections');
const cities = mongoCollections.cities;
let { ObjectId } = require('mongodb');



module.exports = {
  getAllCitiesInformation: async () => {
    const citiesCollection = await cities();
    const citiesList = await citiesCollection.find({}).toArray();
    return citiesList;
  },

  // more simple stuff
  getCities: async (id) => {
    
    if (id === undefined) throw 'You must provide an ID';
    const citiesCollection = await cities();
    const city = await citiesCollection.findOne({ _id: id });

    if (!city) {
      throw 'Could not find city with id of ' + id;
    }
    return city;
    },

    findCitiesBySearchButton: async (cityName, usageMode, businessMode, franchiseeStatus) => {
        if (!cityName || !usageMode || !businessMode || !franchiseeStatus) throw 'You must provide all search options';


        const citiesCollection = await cities();
        
        return await citiesCollection
            .find({
            $and: [
                { "city_name": cityName },
                { "mode": usageMode },
                { "op_mode": businessMode },
                { "franchisee_name": franchiseeStatus}
            ]
            })
            .toArray();
        },

    // this is a VERY slow operation;
    // it has to traverse the whole collection
    searchByJavaScriptQuery: async (keyword) => {
        if (!keyword) throw 'You must provide a keyword';
        const citiesCollection = await cities();
        return await citiesCollection
        .find({
            $where: "this.title.toLowerCase().indexOf('" + keyword + "') >= 0"
        })
        .toArray();
    },

    async create(city_name, mode, op_mode, franchisee_id, franchisee_name, city_admins, open_time, sys_user_name, update_time) {
        if (typeof city_name === 'undefined' || typeof mode === 'undefined' || 
        typeof op_mode === 'undefined' || typeof franchisee_name === 'undefined' || 
        typeof city_admins === 'undefined' || typeof open_time === 'undefined'  
        || typeof sys_user_name === 'undefined' || typeof update_time === 'undefined' || typeof franchisee_id === 'undefined') {
            throw new Error("All fields need to have valid values");
        }
        
        const citiesCollection = await cities();
        
        const newCity = {
            city_name, mode, op_mode, franchisee_id, franchisee_name, city_admins, open_time, sys_user_name, update_time
        }
        
        const insertInfo = await citiesCollection.insertOne(newCity);
        if (insertInfo.insertedCount === 0) throw 'Could not add new city';
    
        const newId = insertInfo.insertedId;
    
        const city = await citiesCollection.findOne({ _id: newId });
        //book._id = book._id.toString();
        return city;
    }
}