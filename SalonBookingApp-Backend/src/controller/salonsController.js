import { connectDB } from "../config/database.js";
// import { ObjectId } from "mongodb";

const collectionName = "salons";

export const getSalons = async (req, res) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  const result = await collection.find().toArray();
  if (result) {
    res.send({ result });
  } else {
    console.log("Data not Found");
  }
};

// export const createUser = async (req, res) => {
//   const db = await connectDB();
//   const collection = db.collection(collectionName);
//   const data = req.body;
//   const emailExists = await collection.findOne({ email: data.email });
//   if (emailExists) {
//     return res.status(400).send({ success: true, message: "Email already exists" });
//   } else if (data && data.username && data.email && data.role) {
//     const result = await collection.insertOne(data);
//     res.status(201).send({ success: true, result });
//   } else {
//     res.status(400).send({ success: false, message: "Required all fields" });
//   }
// }

// export const deleteUser = async (req, res) => {
//   const db = await connectDB();
//   const email = req.params.email;
//   const collection = db.collection(collectionName);
//   const result = await collection.deleteOne({ email: email });
//   if (result.deletedCount > 0) {
//     res.status(200).send({ success: true, message: "User deleted" });
//   } else {
//     res.status(404).send({ success: false, message: "User not found" });
//   }
// }

// export const updateUser = async (req, res) => {
//   try {
//     const db = await connectDB();
//     const collection = db.collection(collectionName);

//     const id = req.params.id;
//     const { _id, ...fields } = req.body; 
//     const emailExists = await collection.findOne({ email: fields.email, _id: { $ne: new ObjectId(id) } });

//     if (emailExists) {
//       return res.status(400).send({
//         success: false,
//         message: "Email already exists"
//       });
//     }


//     const result = await collection.updateOne(
//       { _id: new ObjectId(id) },
//       { $set: fields }
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).send({
//         success: false,
//         message: "User not found"
//       });
//     }

//     res.send({
//       success: true,
//       message: "User updated successfully"
//     });

//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Server error",
//       error: error.message
//     });
//   }
// }

// export const getUserById = async (req, res) => {
//   try {
//     const db = await connectDB();
//     const collection = db.collection(collectionName);

//     const id = req.params.id;

//     const result = await collection.findOne({ _id: new ObjectId(id) });

//     if (!result) {
//       return res.status(404).send({
//         success: false,
//         message: "User not found"
//       });
//     }

//     res.send({ success: true, result });

//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Invalid user ID or server error",
//     });
//   }
// };
