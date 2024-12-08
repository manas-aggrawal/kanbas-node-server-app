import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // update an assignment
  app.put(
    "/api/courses/:courseId/assignments/:assignmentId",
    async (req, res) => {
      const { assignmentId, courseId } = req.params;
      const assignmentUpdates = req.body;
      console.log("🚀 ~ assignmentUpdates:", assignmentUpdates);
      const updatedAssignment = await assignmentsDao.updateAssignment(
        assignmentId,
        courseId,
        assignmentUpdates
      );

      res.status(204).json(updatedAssignment);
    }
  );

  // delete an assignment
  app.delete(
    "/api/courses/:courseId/assignments/:assignmentId",
    async (req, res) => {
      const { courseId, assignmentId } = req.params;

      try {
        await assignmentsDao.deleteAssignment(courseId, assignmentId);
        res.status(200);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );

  app.get("/api/courses/:courseId/assignments/:assignmentId", (req, res) => {
    const { courseId } = req.params;
    const result = assignmentsDao.findAssignmentsForCourse(courseId);
    res.sendStatus(200).json(result);
  });
}