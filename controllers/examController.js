const ExamPaper = require("../models/ExamPaper");
const ExamTimetable = require("../models/ExamTimetable");

exports.submitExamPaper = async (req, res) => {
  try {
    const { title, subject, department, fileUrl } = req.body;
    const newExamPaper = new ExamPaper({
      title,
      subject,
      department,
      uploadedBy: req.user.id,
      fileUrl,
    });

    await newExamPaper.save();
    res.status(201).json(newExamPaper);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.reviewExamPaper = async (req, res) => {
  try {
    const { status, comment } = req.body;
    const examPaper = await ExamPaper.findById(req.params.id);

    if (!examPaper) {
      return res.status(404).json({ msg: "Exam paper not found" });
    }

    examPaper.status = status;
    examPaper.reviewedBy = req.user.id;
    examPaper.comments.push({
      user: req.user.id,
      text: comment,
    });

    await examPaper.save();
    res.json(examPaper);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.createExamTimetable = async (req, res) => {
  try {
    const { course, subject, department, date, startTime, endTime, room } =
      req.body;
    const newExamTimetable = new ExamTimetable({
      course,
      subject,
      department,
      date,
      startTime,
      endTime,
      room,
    });

    await newExamTimetable.save();
    res.status(201).json(newExamTimetable);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getExamTimetable = async (req, res) => {
  try {
    const examTimetable = await ExamTimetable.find({
      department: req.params.department,
    });
    res.json(examTimetable);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
