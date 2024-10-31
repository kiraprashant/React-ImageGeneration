import React from "react";
import { Container,Box } from "@mui/material";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Login() {

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
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 56px)",
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
          LOGIN
        </Typography>

        <TextField
          style={{ marginBottom: "36px" }}
          fullWidth
          label="email"
          id="fullWidth"
          // value={field}
          size="small"
          // onChange={(e) => setfield(e.target.value)}
        />
        <TextField
          fullWidth
          label="password"
          id="fullWidth"
          // value={field}
          size="small"
          // onChange={(e) => setfield(e.target.value)}
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

        <Button fullWidth variant="contained" style={{ marginBottom: 16 }}>
          Sign in
        </Button>

        <Typography variant="body2" style={{ textAlign: "center" }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </div>
    </Box>
  );
}

export default Login;
