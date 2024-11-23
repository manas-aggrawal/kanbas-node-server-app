import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });
  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    dao.deleteCourse(courseId);
    res.sendStatus(204);
  });
  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    dao.updateCourse(courseId, courseUpdates);
    res.sendStatus(204);
  });
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });

  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });
  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = assignmentsDao.createAssignment(assignment);
    res.send(newAssignment);
  });

  app.get("/api/courses/enrollments", (req, res) => {
    const enrollments = enrollmentsDao.findAllEnrollments();
    res.json(enrollments);
  });

  app.post("/api/courses/:courseId/enroll/:userId", (req, res) => {
    console.log("Enrolling user in course:", req.params.courseId);
    const { courseId, userId } = req.params;
    const enrollUser = enrollmentsDao.enrollUserInCourse(userId, courseId);
    console.log("Enrollment result:", enrollUser);
    res.send(enrollUser);
  });

  app.post("/api/courses/:courseId/unenroll/:userId", (req, res) => {
    console.log("unEnrolling user in course:", req.params.courseId);
    const { courseId, userId } = req.params;
    const unenrollUser = enrollmentsDao.unenrollUserInCourse(userId, courseId);
    console.log("unEnrollment result:", unenrollUser);
    res.send(unenrollUser);
  });
}