// import Database from "../Database/index.js";
import model from "./model.js";

export async function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}
export async function createQuiz(quiz) {
  const data = await model.create(quiz);
  return data;
}

export async function deleteQuiz(quizId) {
  await model.findByIdAndDelete({ _id: quizId });
  return;
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

  return quiz;
}
