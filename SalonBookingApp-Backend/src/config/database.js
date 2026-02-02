import { MongoClient } from "mongodb";

import dotenv from 'dotenv';
dotenv.config();
 
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const dbName = process.env.DB_NAME;

let db;

export const connectDB = async () => {
  if (!db) {
    const connection = await client.connect();
    db = connection.db(dbName);
  }
  return db;
};



