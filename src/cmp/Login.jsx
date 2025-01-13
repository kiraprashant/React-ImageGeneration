import React,{useState}from "react";
import { Container,Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Login() {

const [LoginState,setLoginState] = useState({
  Email:"",
  Password:""
})

const [open, setOpen] = useState(false);
const [Err,setErr] = useState(false)
const Navigate = useNavigate()

const handleChange = (e) =>{
 const {name,value} = e.target
 setLoginState({...LoginState,[name]:value})
}
  // Open the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
  };

const handleSubmit = () =>{

  const {Email,Password} = LoginState
console.log("logged")
  if(Email === ""){
    setErr(true)
    handleClickOpen()
    return 
  }
  if(Password === ""){
    handleClickOpen()
    setErr(true)
    return 
  }

  const toastId = toast.loading("Pending....");
   axios.post("http://localhost:4000/Login",LoginState)
  .then((res) =>{
  
    console.log(res.data)
     console.log(res.data)


     if(res.data.Message === "invalid user Found"){
      setTimeout(() => {
        toast.update(toastId, {
          render: "User Not Found!",
          type: "error",  // Success type to show a green check mark
          isLoading: false, // Remove the spinner
          autoClose: 3000,  // Close after 3 seconds
        });
      }, 2000); // Delay of 2 seconds (2000 milliseconds)
    }

    else{
      console.log("/////////////////////////",res.data)
      localStorage.setItem("token",res.data.token)
      const data = JSON.stringify(res.data.UserDetails)
      localStorage.setItem("User",data)
      console.log("/////////////////////////",res)
  
      toast.update(toastId, {
        render: "User Found!",
        type: "success",  // Success type to show a green check mark
        isLoading: false, // Remove the spinner
        autoClose: 3000,  // Close after 3 seconds
      });

      setLoginState({
        Email: "",
        Password: "",
      });
      
      setTimeout(()=>{
        Navigate("/")
      },3000)
      
    }

  })
  .catch((err) => {
   console.log(err.response?.status);
    if(err.status === 401){
      setTimeout(() => {
        toast.update(toastId, {
          render: "User Not Found!",
          type: "error",  // Success type to show a green check mark
          isLoading: false, // Remove the spinner
          autoClose: 3000,  // Close after 3 seconds
        });
      }, 2000);
    }
  });

  // toast.promise(loginPromise, {
  //   pending: "Promise is pending",
  //   success: "Promise  Loaded",
  //   error: "error",
  // });
}

  const BRANDING = {
    logo: (
      <img
        src="https://mui.com/static/logo.svg"
        alt="MUI logo"
        style={{ height: 24 }}
      />
    ),
    title: 'MUI',
  };

  return (
    <>
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 56px)",
        width: "100vw",
      }}
    >
<ToastContainer 

  hideProgressBar={false}
/>

      <div
        style={{
          width: "100vw",
          maxWidth: 450,
          marginLeft: 5,
          marginRight: 5,
          border: "1px solid #e7e9ef",
          padding: "20px",
          borderRadius: 8,
        }}
      >
        <Typography variant="h5" style={{ marginBottom: 16 }}>
          LOGIN
        </Typography>

        <TextField
          style={{ marginBottom: "36px" }}
          fullWidth
          label="Email"
          name="Email"
          id="fullWidth"
          value={LoginState.Email}
          size="small"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          fullWidth
          label="password"
          name="Password"
          id="fullWidth"
          value={LoginState.Password}
          size="small"
          onChange={(e) => handleChange(e)}
        />
        <Box
          style={{ textAlign: "right" }}
          sx={{ mb: 5 }}
        >
          <Typography
            variant="body2"
            component="a"
            href="#"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Do you Forgot your password?
          </Typography>
        </Box>

        <Button onClick={() => handleSubmit()} fullWidth variant="contained" style={{ marginBottom: 16 }}>
          Sign in
        </Button>

        <Typography variant="body2" style={{ textAlign: "center" }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <p>password and username invalid</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </>
  );
}

export default Login;
