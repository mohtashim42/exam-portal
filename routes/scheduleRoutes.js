const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

router.post(
  "/",
  auth,
  roleCheck(["admin"]),
  scheduleController.createDutySchedule
);
router.get(
  "/",
  auth,
  roleCheck(["teacher"]),
  scheduleController.getDutySchedule
);
router.put(
  "/:id",
  auth,
  roleCheck(["admin"]),
  scheduleController.updateDutySchedule
);

module.exports = router;
