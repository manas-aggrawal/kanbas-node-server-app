import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    course: {
      type: String,
    },
    availableFrom: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    availableUntil: {
      type: Date,
    },
    points: {
      type: Number,
    },
  },
  { collection: "assignments" }
);
export default assignmentSchema;