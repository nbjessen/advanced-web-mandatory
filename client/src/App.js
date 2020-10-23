import React, {useEffect, useState} from 'react';
import {Router} from "@reach/router";
import Questions from './Questions';
import Question from './Question';
const API_URL = process.env.REACT_APP_API;

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/questions`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    }
    getData();
  }, []); 



  //TODO
  function getQuestion(id){
    console.log(data);
    const question = data.find(element => element._id === id);
    return question;
  }


  return (
    <>
      <Router>
        <Questions path="/" questions={data}/>
        <Question path="/question/:id" getQuestion={getQuestion}/>
      </Router>


      <h1>Mandatory App!</h1>
      <p>Data from server:</p> 
      {data.map(question => {
        return <p key={question._id}>{question.title}, {question.description}, {question.answer}, ({question._id})</p>;
        
      })} 
    </> 
  );
}

export default App;
