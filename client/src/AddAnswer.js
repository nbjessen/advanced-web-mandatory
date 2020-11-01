import React, {useState} from 'react';

function AddAnswer(props) {
    const [answer, setAnswer] = useState("");
  
    return (
      <>
        <h3>Add Comment</h3>
  
        <input onChange={(event) => setAnswer(event.target.value)} type="text" placeholder="Comment" />
  
        <button type="button" onClick={(event) => props.addAnswer(answer)}>
          Submit
        </button>
        <br/>
      </>
    );
  }
  
  export default AddAnswer;
  