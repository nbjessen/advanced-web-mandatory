module.exports = (mongoose) => {
  const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    answers: [{answer: String, score: Number}]
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

  async function createAnswer(answer, id) {
      
      let newAnswer = {answer: answer, score: 0};
      
      return await questionModel.findOneAndUpdate(
        { _id: id },
        { $push: { answers: newAnswer } }
      );
  }

  async function answerScore(questionId, answerId) {
    console.log('questionId: ' + questionId + 'answerId: ' + answerId);
    return await questionModel.update(
      { _id: questionId, 'answers._id': answerId },
      { $inc: { 'answers.$.score': 1 } },
      { new: true }
    );
  }


  return {
  getQuestions,
  getQuestion,
  createQuestion,
  createAnswer,
  answerScore
  }
}