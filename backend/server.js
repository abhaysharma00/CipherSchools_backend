import express from "express";
const app = express();
import mongoose from "mongoose";
import Router from "./routes/index.js";
import cors from "cors";
// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// sample route

// middleware
// app.use(express.static("../frontend/public/index.html"));
app.get("/videoplayer", (req, res) => res.send("welcome"));
app.use("/app", Router);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));

  constpath = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// connecting mongoDB and starting server
const start = async () => {
  try {
    await mongoose.connect(process.env.mongo_url);
    console.log("db connected");
    app.listen(PORT, () => {
      console.log("listening");
    });
  } catch (e) {
    console.log(e);
  }
};
start();
