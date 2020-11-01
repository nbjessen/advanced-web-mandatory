module.exports = (mongoose) => {
  const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    answers: [{answer: String, like: Number, dislike: Number}]
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

  async function createAnswer(answer, like, dislike) {

    //TODO DEN FÅR IKKE NOGET ID
      let question = await getQuestion(id);
      let newAnswer = {answers: [{answer: answer, like: like, dislike: dislike}]};

      question.push(newAnswer);
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