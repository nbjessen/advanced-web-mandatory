import React, {useEffect, useState} from 'react';
import {Router} from "@reach/router";
import Questions from './Questions';
import Question from './Question';
const API_URL = process.env.REACT_APP_API;

function App() {
  const [data, setData] = useState([]);
  
  //Fetching data from the server
  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/questions`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    }
    getData();
  }, []); 


  //Gets question
  function getQuestion(id){

    console.log(data);
    const question = data.find(element => element._id === id);
    return question;
  }

  //Posts question
  async function addQuestion(title, description) {

    console.log(title, description);

    const newQuestion = {
      title: title,
      description: description,
    }   

    const url = `${API_URL}/questions`;
    const response = await fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    });
    
    const data = await response.json();
    console.log(data);
  }



  //Post answer
  async function addAnswer(answerId, answer) {
    console.log(answer);

    //isolating question id from url
    const url = window.location.href;
    const info = url.split('/');
    const id = info[info.length -1];

    const newAnswer = {
      answerId: answerId,
      answer: answer
    }   

    const newUrl = `${API_URL}/${id}/answers`;
    const response = await fetch(newUrl, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAnswer),
    });
    
    const data = await response.json();
    console.log(data);
  }

  //Add to score
  async function addScore(score){

    const url = window.location.href;
    const info = url.split('/');
    const id = info[info.length -1];

    const newScore = {
      score: score
    }

    const newUrl = `${API_URL}/${id}/score`;
    const response = await fetch(newUrl, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newScore),
    });
    
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <Router>
        <Questions path="/" questions={data} addQuestion={addQuestion}/>
        <Question path="/question/:id" getQuestion={getQuestion} addAnswer={addAnswer} addScore={addScore}/>
      </Router>


      
    </> 
  );
}

export default App;


