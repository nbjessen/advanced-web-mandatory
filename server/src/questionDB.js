module.exports = (mongoose) => {
  const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    answers: [{answerId: Number, answer: String, score: Number}]
  });

  const questionModel = mongoose.model('question', questionSchema);

  async function getQuestions() {
      try {
        return await questionModel.find();
      } catch (error) {
        console.error("getQuestion:", error.message);
        return {};
      }
    }

  async function getQuestion(id) {
      try {
        return await questionModel.findById(id);
      } catch (error) {
        console.error("getQuestion:", error.message);
        return {};
      }
    }

  async function getAnswer(id) {
    try {
      return await questionModel.answers.answerId.findById(id);
    } catch (error) {
      console.error("getAnswer", error.message);
        return {};
    }
  }

  async function createQuestion(title, description) {
      let question = new questionModel({title: title, description: description});
      return question.save();
  }

  async function createAnswer(answerId, answer, id) {
      let question = await getQuestion(id);
      let newAnswer = {answerId: answerId, answer: answer, score: 0};
      question.answers.push(newAnswer);
      question.save();
      return question
  }

  async function incrScore(score, answerId) {
    let answer = await getAnswer(answerId);
    let newAnswer = {score: score + 1};
    answer.answers.push(newAnswer);
    answer.save();
    return answer
}


  return {
  getQuestions,
  getQuestion,
  createQuestion,
  createAnswer,
  incrScore
  }
}