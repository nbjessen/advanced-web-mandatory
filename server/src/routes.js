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
    const answerId = req.body.answerId
    const id = req.params.id;
      questionDB.createAnswer(answerId, answer, id);
      res.json({msg: 'Answer has been saved!'})
  });

  router.post('/:id/score', async (req, res) => {
    const score = req.body.score;
    const answerid = req.params.answerId;
      questionDB.incrScore(score, answerid);
      res.json({msg: 'Score has been saved!'})
  });


  return router;
}
