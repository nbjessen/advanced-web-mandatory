module.exports = (questionDB) => {
  const express = require("express");
  const router = express.Router();

  /**** Routes ****/
  router.get('/questions', async (req, res) => {
    const questions = await questionDB.getQuestions(); 
    res.json(questions);
  });

  router.get('/:id', async (req, res) => {
    const question = await questionDB.getQuestion(req.params.id);
    res.json(question);
  });

  router.post('/questions', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
      questionDB.createQuestion(title, description);
      res.json({msg: 'Question has been saved!'})
  });

  router.post('/:id/answers', async (req, res) => {
    const answer = req.body.answer;
    const id = req.params.id;
      await questionDB.createAnswer(answer, id);
      res.json({msg: 'Answer has been saved!'})
  });

  router.post('/:id/answerScore', async (req, res) => {
    const questionID = req.body.questionID;
    const answerID = req.body.answerID;
     await questionDB.answerScore(questionID, answerID);
      res.json({msg: 'Score has been saved!'})
  });


  


  return router;
}
