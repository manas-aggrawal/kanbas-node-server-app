import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.String },
  type: { type: String, required: true, enum: ["mcq", "tf", "fib"] },
  answer: { type: String, required: false },
});

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.String, ref: "UserModel" },
    course: { type: mongoose.Schema.Types.String, ref: "CourseModel" },
    quiz: { type: String, ref: "QuizModel" },
    responses: [responseSchema],
    score: { type: Number },
    timeBegin: { type: String },
    submittedAt: { type: String },
  },
  { collection: "quiz_submissions" }
);

export default schema;
