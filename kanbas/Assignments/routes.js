import * as assignmentsDao from "./dao.js";
export default function AssignmentRoutes(app) {
  // update an assignment
  app.put("/api/courses/:courseId/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const updatedAssignment = assignmentsDao.updateAssignment(
      assignmentId,
      assignmentUpdates
    );
    res.sendStatus(204).json(updatedAssignment);
  });

  // delete an assignment
  app.delete("/api/courses/:courseId/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignments = assignmentsDao.deleteAssignment(assignmentId);
    res.sendStatus(204).json(assignments);
  });

  app.get("/api/courses/:courseId/assignments/:assignmentId", (req, res) => {
    const { courseId } = req.params;
    const result = assignmentsDao.findAssignmentsForCourse(courseId);
    res.sendStatus(200).json(result);
  });
}
