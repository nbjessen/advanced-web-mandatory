import React, {useState} from 'react';

function AddQuestion(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
    return (
      <>
        <h3>Add Question</h3>
  
        <input onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Title" />
        <input onChange={(event) => setDescription(event.target.value)} type="text" placeholder="Description"/>
  
        <button type="button" onClick={(event) => props.addQuestion(title, description)}>
          Submit
        </button>
      </>
    );
  }
  
  export default AddQuestion;
  