const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

router.post(
  "/submit",
  auth,
  roleCheck(["teacher"]),
  examController.submitExamPaper
);
router.put(
  "/review/:id",
  auth,
  roleCheck(["hod", "admin"]),
  examController.reviewExamPaper
);
router.post(
  "/timetable",
  auth,
  roleCheck(["admin"]),
  examController.createExamTimetable
);
router.get("/timetable/:department", auth, examController.getExamTimetable);

module.exports = router;
