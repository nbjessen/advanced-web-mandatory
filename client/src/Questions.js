import React from 'react';
import {Link} from "@reach/router";


function Questions(props) {
  let questions = props.questions;

  const mapFunction = question => 
    <Link to={`/question/${question.id}`} key={question.id}>
      <li>{question.title}</li>
    </Link>;

  const list = questions.map(mapFunction);

  return (
    <>
      <h3>Questions</h3>
      <ul>
        {list}
      </ul>

    </>
  );
}

export default Questions;
