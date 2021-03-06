import initializeDatabase from './database/dbQuestion'
import app from './app'
const start = async () => {
  const controller = await initializeDatabase();

  app.get("/", (req, res, next) => res.send("ok"));

  // CREATE
  app.get("/question/new", async (req, res, next) => {
    try {
      const { question_text , question_type } = req.query;
      const result = await controller.createQuestion({ question_text,question_type });
      res.json({ success: true, result });
    } catch (e) {
      next(e);
    }
  });

  // READ
  app.get("/questions/get/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const question = await controller.getQuestion(id);
      res.json({ success: true, result: question });
    } catch (e) {
      next(e);
    }
  });

  // DELETE
  app.get("/questions/delete/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await controller.deleteQuestion(id);
      res.json({ success: true, result });
    } catch (e) {
      next(e);
    }
  });

  // UPDATE
  app.get("/questions/update/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { question_text,question_type } = req.query;
      const result = await controller.updateQuestion(id, { question_text,question_type });
      res.json({ success: true, result });
    } catch (e) {
      next(e);
    }
  });

  // LIST
  app.get("/questions/list", async (req, res, next) => {
    try {
      const { order } = req.query;
      const questions = await controller.getQuestionList(order);
      res.json({ success: true, result: questions });
    } catch (e) {
      next(e);
    }
  });

  //answer List
  app.get("/answer/list", async (req, res, next) => {
    try {
      const { order } = req.query;
      const answer = await controller.getAnswerList(order);
      res.json({ success: true, result: answer });
    } catch (e) {
      next(e);
    }
  });
/// read answer id
app.get("/answer/get/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const answer = await controller.getAnswer(id);
    res.json({ success: true, result: answer });
  } catch (e) {
    next(e);
  }
});
  // ERROR
  app.use((err, req, res, next) => {
    console.error(err)
    const message = err.message
    res.status(500).json({ success:false, message })
  })
  
  app.listen(8080, () => console.log("server listening on port 8080"));
};

start();
