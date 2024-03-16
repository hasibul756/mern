import axios from 'axios';
import { useEffect, useState } from "react";

function App() {
  const[data,setData] = useState([])

  useEffect(()=>{
    axios.get('/api/user')
    .then((response)=> {
      setData(response.data)
    })
    .catch((error)=> {
      console.log(error);
    })
  },[]);

  return (
    <>
    <h1>Total Data {data.length}</h1>
    {
      data.map((data,index)=> (
        <p key={index}>{data.name}: {data.email}</p>
      ))
    }
    </>
  )
}

export default App