import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const db = () => {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        console.log("Mongodb connected");
      })
      .catch((err) => console.log(err));
}

export default db