const DutySchedule = require("../models/DutySchedule");

exports.createDutySchedule = async (req, res) => {
  try {
    const { teacher, exam, room, date, startTime, endTime } = req.body;
    const newDutySchedule = new DutySchedule({
      teacher,
      exam,
      room,
      date,
      startTime,
      endTime,
    });

    await newDutySchedule.save();
    res.status(201).json(newDutySchedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getDutySchedule = async (req, res) => {
  try {
    const dutySchedule = await DutySchedule.find({ teacher: req.user.id })
      .populate("exam", "course subject")
      .sort({ date: 1 });
    res.json(dutySchedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateDutySchedule = async (req, res) => {
  try {
    const { room, date, startTime, endTime } = req.body;
    const dutySchedule = await DutySchedule.findById(req.params.id);

    if (!dutySchedule) {
      return res.status(404).json({ msg: "Duty schedule not found" });
    }

    dutySchedule.room = room;
    dutySchedule.date = date;
    dutySchedule.startTime = startTime;
    dutySchedule.endTime = endTime;

    await dutySchedule.save();
    res.json(dutySchedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
