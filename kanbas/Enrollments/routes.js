import * as dao from "./dao.js";
export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments/:userId", (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findCoursesForEnrolledUser(userId);
    res.json(enrollments);
  });

  // write to enroll and unenroll users in courses
  app.post("/api/enrollments", (req, res) => {
    const { user, course } = req.body;
    const data = dao.enrollUserInCourse(user, course);

    res.status(201).json(data);
  });
  app.delete("/api/enrollments/:user/:course", (req, res) => {
    const { user, course } = req.params;
    if (!user || !course) {
      return res.status(400).json({ error: "User and course are required." });
    }
    dao.unenrollUserFromCourse(user, course);

    res.sendStatus(204);
  });

  // write to find all enrollments for a course
  app.get("/api/enrollments/course/:courseId", (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findUsersForEnrolledCourse(courseId);
    res.json(enrollments);
  });

  // write to find all enrollments
  app.get("/api/enrollments", (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.json(enrollments);
  });

  // write to enroll another user using username
  app.post("/api/enrollments/username", (req, res) => {
    const { username, courseId } = req.body;
    const isEnrolled = dao.enrollUserInCourseByUsername(username, courseId);
    if (isEnrolled) {
      res.sendStatus(201);
    } else {
      res.status(400).json({
        error:
          "User is already enrolled in the course or user/course not found.",
      });
    }
  });
}
