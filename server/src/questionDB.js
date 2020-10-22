module.exports = (mongoose) => {
  const questionSchema = new mongoose.Schema({
    description: String,
    answer: [String],
    like: Number,
    dislike: Number
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


  async function createQuestion(text) {
      let question = new questionModel({description: text});
      return question.save();
  }

  //Hvis der ikke er noge spørgsmål, lav 10 nye
  async function bootstrap(count = 10) {
      let l = (await getQuestions()).length;
      console.log("Question collection size:", l);
  
      if (l === 0) {
        let promises = [];
        for (let i = 0; i < count; i++) {
          let newQuestion = new questionModel({description: `This is question number ${i}`, answer: ["Det her er et svar", "Det her er et andet svar"], like: 1, dislike: 2});
          promises.push(newQuestion.save());
        }
        return Promise.all(promises);
      }
  }

  return {
  getQuestions,
  getQuestion,
  createQuestion,
  bootstrap
  }

}