import React, {useState} from 'react';

function AddAnswer(props) {
    const [answer, setAnswer] = useState("");
    
  //TODO get id from somewhere
    return (
      <>
        <h3>Add Answer</h3>
  
        <input onChange={(event) => setAnswer(event.target.value)} type="text" placeholder="Comment" />
  
        <button type="button" onClick={(event) => props.addAnswer(props.id, answer)}>
          Submit
        </button>
        <br/>
      </>
    );
  }
  
  export default AddAnswer;
  