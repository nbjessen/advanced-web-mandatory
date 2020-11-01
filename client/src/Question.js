import React from 'react';
import {Link} from "@reach/router";
import AddAnswer from './AddAnswer';

function Question(props) {
  const id = props.id;
  const question = props.getQuestion(id);




  console.log(question)

  return (
    <>
      <h3>{question.title}</h3>
      <p>{question.description}</p>
      <AddAnswer addAnswer={props.addAnswer}></AddAnswer>
      <h4>Comments:</h4>
      <p>{question.answers}</p>


      <Link to="/">Back</Link>
    </>
  );
}

export default Question;
