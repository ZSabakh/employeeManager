const express = require("express");
const faceController = require("../controllers/faceRecognition");

const router = express.Router();

router.post("/face_recognition", faceController.faceRecognition);
router.post("/faceupload", faceController.imageUpload);
router.use("/faceimages/:fileName", faceController.imageServe);
module.exports = router;
