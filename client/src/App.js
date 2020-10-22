import React, {useEffect, useState} from 'react';
import questionDB from '../../server/src/questionDB';
const API_URL = process.env.REACT_APP_API;

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/qustions`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    }
    getData();
  }, []); 

  return (
    <>
      <h1>Mandatory App!</h1>
      <p>Data from server:</p> 
      {data.map(qustion => {
        return <p key={qustion._id}>{qustion.description}, {qustion.answer}, {qustion.like}, {question.dislike} ({qustion._id})</p>;
      })}
    </>
  );
}

export default App;
