
import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params
        assignmentsDao.deleteAssignment(assignmentId)
        res.sendStatus(204)
    });

    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params
        const assignmentUpdates = req.body
        const updatedAssignment = assignmentsDao.updateAssignment(assignmentId, assignmentUpdates)
        res.send(updatedAssignment)
    })

    app.post("/api/assignments/create", (req, res) => {
        const assignment = req.body;
        const newAssignment = dao.createAssignment(assignment);
        res.json(newAssignment);
    });
    
}