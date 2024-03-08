const express = require("express");
const router = express.Router();
const { auth, isHospital, isDonor } = require("../middleware/auth");
const getAllPendingRequest = require("../controllers/getAllPendingRequest");

const { createRequest } = require("../controllers/Hospital");

router.post("/createRequest", auth, isHospital, createRequest);
router.get("/getAllPendingRequest", auth, getAllPendingRequest);


module.exports = router;
