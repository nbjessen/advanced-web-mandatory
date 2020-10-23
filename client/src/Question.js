import React from 'react';
import {Link} from "@reach/router";

function Question(props) {
  const id = props.id;
  const question = props.getQuestion(id);

  console.log(question)

  return (
    <>
      <h3>{question.title}</h3>
      <p>{question.description}</p>
      <Link to="/">Back</Link>
    </>
  );
}

export default Question;
