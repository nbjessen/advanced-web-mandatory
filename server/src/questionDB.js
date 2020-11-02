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


  async function createQuestion(title, description) {
      let question = new questionModel({title: title, description: description});
      return question.save();
  }

  async function createAnswer(answer, id) {
    
      let question = await getQuestion(id);
      let newAnswer = {answer: answer, score: 0};


      question.answers.push(newAnswer);
      question.save();
      return question
  }

  return {
  getQuestions,
  getQuestion,
  createQuestion,
  createAnswer
  }
}