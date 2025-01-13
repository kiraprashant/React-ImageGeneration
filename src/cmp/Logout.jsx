import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'


const Logout = () =>{
    const Navigate = useNavigate()
    useEffect(()=>{
     localStorage.clear()
     Navigate("/login")
    },[])
    return(
      <>
        
      </>
    )
}

export default Logout

