const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const notFound = require("./controllers/404");
const app = express();
const fileUpload = require("express-fileupload");
const employeeRoutes = require("./routes/employees");
const faceRecognitionRoutes = require("./routes/faceRecognition");
const authRoutes = require("./routes/auth");
const verifyToken = require("./controllers/verifyToken");
var cors = require("cors");

app.use(cors());
mongoose.connect(
  process.env.MONGO_INFO,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("DB Success");
  }
);

app.use(fileUpload());

app.use(bodyParser.urlencoded());

app.use("/auth", authRoutes);
app.use(faceRecognitionRoutes);
app.use(verifyToken, employeeRoutes);
app.use(notFound);
app.listen(4000);
