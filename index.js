import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import UserRoute from "./routes/userRoute.js";
const port = process.env.PORT || 8800;

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/user", UserRoute);

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MANGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MangoDb connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
connectDb();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/dist"));
  app.get("*", (req, res) => {
    res.sendFile("/frontend/dist");
  });
}

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
