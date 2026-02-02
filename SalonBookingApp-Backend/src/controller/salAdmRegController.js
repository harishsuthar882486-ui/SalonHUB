import { connectDB } from "../config/database.js";
import bcrypt from 'bcrypt'
const collectionName = "salonRequests";

export const registerSalon = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);

    const role = "salonadmin";
    const status = "pending";
    // const password = "admin";

    const { salonName, salonEmail, fullName, phone, category, city, fullAddress } = req.body;
    // const userEmail = salonEmail;
    if (!salonName || !salonEmail || !fullName || !phone || !category || !city || !fullAddress) {
      return res.status(400).send({ success: false, message: "Required all fields" });
    }

    const emailExists = await collection.findOne({ salonEmail });
    if (emailExists) return res.status(400).send({ success: false, message: "Email already exists" });

    const phoneExist = await collection.findOne({ phone });
    if (phoneExist) return res.status(400).send({ success: false, message: "Phone number already exists" });

    const salonNameExist = await collection.findOne({ salonName });
    if (salonNameExist) return res.status(400).send({ success: false, message: "Salon already exists" });

    // const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await collection.insertOne({
      salonName,
      salonEmail,
      phone,
      // password: hashedPassword,
      role,
      fullName,
      category,
      city,
      fullAddress,
      status
      // userEmail
    });

    return res.status(201).send({ success: true, result, message: "Registered" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ success: false, message: "Server error" });
  }
};


