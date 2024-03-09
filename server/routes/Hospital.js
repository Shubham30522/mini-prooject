const express = require("express");
const router = express.Router();
const { auth, isHospital, isDonor } = require("../middleware/auth");
const getAllPendingRequest = require("../controllers/getAllPendingRequest");
const   getAllHospitalRequest = require("../controllers/getAllHospitalRequest");

const { createRequest } = require("../controllers/Hospital");

router.post("/createRequest", auth, isHospital, createRequest);
router.get("/getAllPendingRequest", getAllPendingRequest);
router.get("/getAllHospitalRequest/:hospitalId", getAllHospitalRequest);


module.exports = router;
