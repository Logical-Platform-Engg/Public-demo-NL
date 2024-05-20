require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./DBConnection/DBConfig");
const userRoute = require("./Routes/UserRouter");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB;

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false /* true, limit:'10mb'  */ }));

app.use(
  express.json({
    /* limit:'10mb' */
  })
);

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", userRoute);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");

  app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server running on port ${PORT}`)
  );
});
