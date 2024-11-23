import express from "express";
import {
  enrollUserInCourse,
  unenrollUserInCourse,
  findEnrollmentsByUser,
  findAllEnrollments,
} from "./dao.js";

const router = express.Router();

// Enroll a user in a course
router.post("/enrollments", (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const enrollment = enrollUserInCourse(userId, courseId);
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Unenroll a user from a course
router.delete("/enrollments/:userId/:courseId", (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const removedEnrollment = unenrollUserInCourse(userId, courseId);
    res.status(200).json(removedEnrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch all enrollments for a specific user
router.get("/enrollments/user/:userId", (req, res) => {
  const { userId } = req.params;

  try {
    const userEnrollments = findEnrollmentsByUser(userId);
    res.status(200).json(userEnrollments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetch all enrollments
router.get("/enrollments", (req, res) => {
  try {
    const enrollments = findAllEnrollments();
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
