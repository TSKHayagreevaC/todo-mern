const { MongoClient } = require('mongodb');
require('dotenv').config();

// URL
const url = process.env.MONGODB_URI;
const dbNameConfig = process.env.MONGODB_NAME;

// DB Name
const dbName = dbNameConfig | 'todosProject'; // replace dbName => MONGODB_NAME @ config.env

 const uri = url | 'mongodb://localhost:27017'; // replace uri => MONGODB_URI @ config.env
  
  let db;
  let client = new MongoClient(uri);
  
  async function mongoConnect(req, res, next) {
    if (!db) {
      try {
        await client.connect();
        console.log('Connected to MongoDB');
        req.db = client.db(dbName);
        next();
      } catch (error) {
        console.error('MongoDB Connection Error : ', error);
        res.status(500).json({ error: 'An error occurred while connecting to MongoDB' });
      }
    } else {
      next();
    }
  }

  
  module.exports = mongoConnect;