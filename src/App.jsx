import React,{useEffect} from 'react'
import GenerateImage from './cmp/GenerateImage.jsx'
import Navbar from './cmp/Navbar.jsx'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './cmp/Home.jsx'
import axios from 'axios'

function App() {
  useEffect(() =>{
    axios.get("http://localhost:4000/getDetails")
    .then((res)=>{
      console.log(res)
    }).catch((e)=>{
     console.log("Err: ",e)
    })
   },[])
  return (
    <>
      <Router>
       <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/generate' element={<GenerateImage/>}/>
         </Routes>
      </Router>
    </>
  )
}

export default App