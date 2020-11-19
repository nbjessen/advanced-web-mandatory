import React from 'react';
import {Link, useParams} from "@reach/router";
import AddAnswer from './AddAnswer';

function Question(props) {

  const params = useParams()
  const id = params.id;
  const question = props.getQuestion(id);

  if (question===undefined) return null 

    const answerList= question.answers.map(e=> {return (
        <>
        <li key={e._id}><p>{e.answer}</p>
        <button onClick={()=> props.addScore(id, e._id)}>Upvote</button> <p>Score: {e.score}</p>
        </li>
        </>
        )
    })


  return (
    <>
      <h3>{question.title}</h3>
      <p>{question.description}</p>
      <AddAnswer id={id} addAnswer={props.addAnswer}></AddAnswer>
      <h4>Answers:</h4>
      <div id="answers">
        {answerList}
     </div>
    

      <Link to="/">Back</Link>
    </>
  );
}

export default Question;
