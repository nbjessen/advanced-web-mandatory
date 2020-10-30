module.exports = (mongoose) => {
  const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    answer: [[String, Number, Number]]
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


  return {
  getQuestions,
  getQuestion,
  createQuestion
  }

}