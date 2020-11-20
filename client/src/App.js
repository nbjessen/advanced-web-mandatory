import React, {useEffect, useState} from 'react';
import {Router} from "@reach/router";
import Questions from './Questions';
import Question from './Question';
import AuthService from "./AuthService";
import Login from "./Login";

const API_URL = process.env.REACT_APP_API;

const authService = new AuthService(`${API_URL}/users/authenticate`);



function App() {
  const [data, setData] = useState([]);
  const [postCount, setPostCount]=useState(0);
  const [requestCount, setRequestCount] = useState(0);
  //Fetching data from the server
  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/questions`;
      const response = await authService.fetch(url);
      const data = await response.json();
      setData(data);
    }
    getData();
  }, [postCount]); 


  //Gets question
  function getQuestion(id){

    console.log(data);
    const question = data.find(element => element._id === id);
    return question;
  }

  //Posts question
  async function addQuestion(title, description) {
    setPostCount(postCount +1);
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
  async function addAnswer(id, answer) {
    console.log(answer);
    setPostCount(postCount +1);
    //isolating question id from url
    const url = window.location.href;
    const info = url.split('/');
    const urlId = info[info.length -1];

    const newAnswer = {
      id: id,
      answer: answer
    }   

    const newUrl = `${API_URL}/${urlId}/answers`;
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
  async function addScore(questionID, answerID){
    setPostCount(postCount +1);
    const url = window.location.href;
    const info = url.split('/');
    const urlId = info[info.length -1];

    const newScore = {
      questionID: questionID,
      answerID: answerID
    }

    const newUrl = `${API_URL}/${urlId}/answerScore`;
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

  async function login(username, password) {
    try {
      const resp = await authService.login(username, password);
      console.log("Authentication:", resp.msg);
      setRequestCount(requestCount + 1);
    } catch (e) {
      console.log("Login", e);
    }
  } 

  return (
    <>

      <Login login={login} />
      {authService.loggedIn() ? <pre>User is logged in</pre> : <pre>User is not logged in</pre>}

      <Router>
        <Questions path="/" questions={data} addQuestion={addQuestion}/>
        <Question path="/question/:id" getQuestion={getQuestion} addAnswer={addAnswer} addScore={addScore}/>
      </Router>


      
    </> 
  );
}

export default App;


