const express = require("express");
const router = express.Router();
const {
  getData,
  postData,
  putData,
  deleteData,
} = require("../controllers/excelApiController");

router.get("/", getData);
router.post("/", postData);
router.put("/:id", putData);
router.delete("/:id", deleteData);

module.exports = router;
