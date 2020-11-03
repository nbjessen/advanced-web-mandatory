import React, { useState } from 'react';
import {Link} from "@reach/router";
import AddAnswer from './AddAnswer';

function Question(props) {
  const [count, setCount] = useState(0);

  


  const id = props.id;
  const question = props.getQuestion(id);

  const answers = question.answers;
  const answerStrings = [];
  for(var i = 0; i < answers.length; i++){
    answerStrings.push(
      <p>
        {"Answer: " + answers[i].answer + " Score: " + answers[i].score + "   "}
        <button type="button" onClick={(event) => {setCount(answers.score + 1); props.addScore(count)}}>+</button>
        <button type="button" onClick={(event) => {setCount(answers.score - 1); props.addScore(count)}}>-</button>
      </p> );
  }


  return (
    <>
      <h3>{question.title}</h3>
      <p>{question.description}</p>
      <AddAnswer addAnswer={props.addAnswer}></AddAnswer>
      <h4>Comments:</h4>
      <div id="answers">
        {answerStrings}
     </div>
    

      <Link to="/">Back</Link>
    </>
  );
}

export default Question;
