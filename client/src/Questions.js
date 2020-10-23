import React from 'react';
import {Link} from "@reach/router";


function Questions(props) {
  let questions = props.questions;

  const mapFunction = question => 
    <Link to={`/question/${question._id}`} key={question._id}>
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
