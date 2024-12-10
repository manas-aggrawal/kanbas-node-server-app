import * as quizzesDao from "./dao.js";
export default function QuizRoutes(app) {
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await quizzesDao.deleteQuiz(quizId);
    res.send(status);
  });
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
    res.send(status);
  });
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await quizzesDao.findQuizById(quizId);
    res.send(status);
  });
  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    const data = await quizzesDao.findQuizzesForCourse(cid);
    res.send(data);
  });
  app.post("/api/courses/quizzes", async (req, res) => {
    const quiz = req.body;

    const data = await quizzesDao.createQuiz(quiz);
    res.send(data);
  });
}
