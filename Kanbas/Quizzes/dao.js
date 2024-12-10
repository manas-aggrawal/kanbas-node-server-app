// import Database from "../Database/index.js";
import model from "./model.js";
export async function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}
export async function createQuiz(quiz) {
  return model.create(quiz);
}

export async function deleteQuiz(quizId) {
  return model.findByIdAndDelete(quizId);
}

export async function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, quizUpdates);
}

export async function findQuizForUser(quizId) {
  const data = await model.findOne({ _id: quizId });
  return data;
}

export async function findQuizById(quizId) {
  const quiz = await model.findOne({ _id: quizId });
  console.log("🚀 ~ findQuizById ~ quiz:", quiz);
  return quiz;
}
