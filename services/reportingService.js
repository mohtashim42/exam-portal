const ExamPaper = require("../models/ExamPaper");
const DutySchedule = require("../models/DutySchedule");
const ExamTimetable = require("../models/ExamTimetable");

exports.generateExamPaperReport = async (department) => {
  try {
    const examPapers = await ExamPaper.find({ department })
      .populate("uploadedBy", "name")
      .populate("reviewedBy", "name");

    const report = examPapers.map((paper) => ({
      title: paper.title,
      subject: paper.subject,
      status: paper.status,
      uploadedBy: paper.uploadedBy.name,
      reviewedBy: paper.reviewedBy ? paper.reviewedBy.name : "Not reviewed",
      createdAt: paper.createdAt,
    }));

    return report;
  } catch (error) {
    console.error("Error generating exam paper report:", error);
    throw error;
  }
};

exports.generateDutyScheduleReport = async (department) => {
  try {
    const dutySchedules = await DutySchedule.find()
      .populate("teacher", "name department")
      .populate("exam", "course subject")
      .sort({ date: 1 });

    const report = dutySchedules
      .filter((schedule) => schedule.teacher.department === department)
      .map((schedule) => ({
        teacherName: schedule.teacher.name,
        course: schedule.exam.course,
        subject: schedule.exam.subject,
        date: schedule.date,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        room: schedule.room,
      }));

    return report;
  } catch (error) {
    console.error("Error generating duty schedule report:", error);
    throw error;
  }
};
