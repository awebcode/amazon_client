
import dotenv from "dotenv"
import connectionDb from "./config/db.js"
import cloudinary from "cloudinary"
import app from "./app.js"
import multer from "multer";
dotenv.config();
//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Database
connectionDb()

app.listen(process.env.PORT, () => {
    console.log(`app is running ON PORT:${process.env.PORT}`)
})