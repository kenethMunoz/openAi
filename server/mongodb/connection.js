import mongoose from "mongoose";

const connectDB = async (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("connected to mongo"))
    .catch((error) => {
      console.error("failed to connect with mongo uwu");
      console.error(error);
    });
};

export default connectDB;
