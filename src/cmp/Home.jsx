import React ,{useEffect,useState} from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';

function Home() {
  useEffect(()=>{
   axios.get("http://localhost:4000/getDetails")
   .then((res)=>{
    console.log(res.data)
   })
   .catch((e)=>{
    console.log(e)
   })
  },[])
  return (
    <Button variant="contained">Hello world</Button>
  )
}

export default Home