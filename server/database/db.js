import mongoose from "mongoose";

const connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.1rjwk.mongodb.net/Ecommerce?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database is successfully connected");
  } catch (error) {
    console.log(error);
  }
};

export default connection;
