import express, { request } from "express";
import { PORT, mongoDBURI } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body (when sending post request it won't consider json files)
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors()); // 1st method: allow all origins with default of cors(*)

//    2nd method: allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  //   console.log(req);
  return res.status(202).send("WELCOME,.");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURI)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
