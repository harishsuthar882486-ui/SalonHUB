import { connectDB } from "../config/database.js";
import bcrypt from "bcrypt";
import jwtController from "jsonwebtoken";

const collectionName = "users";

export const registerUser = async (req, res) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  const role = "customer";
  const { fullName, userEmail, password, phone } = req.body;

  if (!fullName || !userEmail || !password || !phone) {
    return res.status(400).send({ success: false, message: "Required all fields" });
  }

  const emailExists = await collection.findOne({ userEmail });
  if (emailExists) {
    return res.status(400).send({ success: false, message: "Email already exists" });
  }
  const phoneExist = await collection.findOne({ phone });
  if (phoneExist) {
    return res.status(400).send({ success: false, message: "Phone number already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await collection.insertOne({
    fullName,
    userEmail,
    phone,
    role,
    password: hashedPassword
  });

  res.status(201).send({ success: true, result });
};

export const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  const db = await connectDB();
  const collection = db.collection(collectionName); 

  const user = await collection.findOne({ userEmail });

  if (!user) {
    return res.status(400).send({ success: false, message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send({ success: false, message: "Invalid email or password" });
  }

  const tokenData = {
    userId: user._id,
    fullName: user.fullName,
    userEmail: user.userEmail,
    phone: user.phone,
    role: user.role,
  };

  jwtController.sign(tokenData, "Google", { expiresIn: "2h" }, (err, token) => {
    if (err) {
      return res.status(500).send({ success: false });
    }

    res.status(200).send({
      success: true,
      token,
      user: {
        fullName: user.fullName,
        userEmail: user.userEmail,
        phone: user.phone,
        role: user.role
      }
    });
  });
};