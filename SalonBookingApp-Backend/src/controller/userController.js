import { connectDB } from "../config/database.js";
// import { ObjectId } from "mongodb";

const collectionName = "users";

export const getUsers = async (req, res) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  const result = await collection.find().toArray();
  if (result) {
    res.send({ result });
  } else {
    console.log("Data not Found");
  }
};