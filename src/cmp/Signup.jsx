import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [Register, setRegister] = useState({
    Name: "",
    Email: "",
    Password: "",
    CPassword: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...Register, [name]: value });
  };

  const UserRegistration = () => {
    const { Name, Email, Password, CPassword } = Register;

    if (Name === "" || Password === "" || CPassword === "" || Email === "") {
      return false
    }

    if (Password !== CPassword) {
      return false;
    }

    console.log("Working");
    axios.post("http://localhost:4000/Register",Register)
    .then((res) =>{
      console.log(res.data)
      setRegister({
        Name: "",
        Email: "",
        Password: "",
        CPassword: "",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  
  };
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 80px)",
        width: "100vw",
      }}
    >
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
          SIGN-UP
        </Typography>

        <TextField
          sx={{ mb: 5 }}
          fullWidth
          name="Name"
          label="Name"
          id="fullWidth"
          value={Register.Name}
          size="small"
          onChange={(e) => HandleChange(e)}
        />

        <TextField
          sx={{ mb: 5 }}
          fullWidth
          label="email"
          id="fullWidth"
          name="Email"
          value={Register.Email}
          size="small"
          onChange={(e) => HandleChange(e)}
        />

        <TextField
          fullWidth
          label="password"
          id="fullWidth"
          type="password"
          name="Password"
          value={Register.Password}
          size="small"
          sx={{ mb: 5 }}
          onChange={(e) => HandleChange(e)}
        />

        <TextField
          fullWidth
          label="confirm password"
          id="fullWidth"
          type="password"
          name="CPassword"
          value={Register.CPassword}
          size="small"
          sx={{ mb: 5 }}
          onChange={(e) => HandleChange(e)}
        />

        <Button
          onClick={() => UserRegistration()}
          fullWidth
          variant="contained"
          style={{ marginBottom: 16 }}
        >
          Sign UP
        </Button>

        <Typography variant="body2" style={{ textAlign: "center" }}>
          Already Have a Account <Link to="/login">Sign In</Link>
        </Typography>
      </div>
    </Box>
  );
}

export default Signup;
