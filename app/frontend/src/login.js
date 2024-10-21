// src/Login.js
import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "./firebase";
/* import { auth, googleProvider, facebookProvider } from "./firebase"; */
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import getSignInTheme from "./getSignInTheme";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./CustomIcons";
import logo from "./images/logo.jpg";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));
const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 20,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

const Login = () => {
  const [mode, setMode] =  useState("light");
  const [showCustomTheme, setShowCustomTheme] =  useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));
  const [emailError, setEmailError] =  useState(false);
  const [emailErrorMessage, setEmailErrorMessage] =  useState("");
  const [passwordError, setPasswordError] =  useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] =  useState("");
  const [open, setOpen] =  useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // This code only runs on the client side, to determine the system color preference
  useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  }; */

  /* const validateInputs = () => {

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  }; */

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error.code, error.message);
      setError(error.message); // This will display a user-friendly error
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Google Login successful");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  /*  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      console.log("Facebook Login successful");
    } catch (error) {
      setError(error.message);
    }
  };
 */
  /* return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <TextField
          required
          type="email"
          id="outlined-required"
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          type="password"
          id="outlined-required"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
      <Button type="submit" variant="outlined" onClick={handleGoogleLogin} startIcon={<Google/>}>
        Login with Google
      </Button>
    </div>
  ); */
  return (
      <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            
            <img src={logo} alt="netlogic logo" height={"20%"} width={"25%"}/>
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? "error" : "primary"}
                  sx={{ ariaLabel: "email" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Link
                    component="button"
                    onClick={handleClickOpen}
                    variant="body2"
                    sx={{ alignSelf: "baseline" }}
                  >
                    Forgot your password?
                  </Link>
                </Box>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? "error" : "primary"}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <ForgotPassword open={open} handleClose={handleClose} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign in
              </Button>
              {/* <Typography sx={{ textAlign: "center" }}>
                Don&apos;t have an account?{" "}
                <span>
                  <Link
                    onClick={navigate("/signup")}
                    variant="body2"
                    sx={{ alignSelf: "center" }}
                  >
                    Sign up
                  </Link>
                </span>
              </Typography> */}
            </Box>
            <Divider>or</Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                onClick={handleGoogleLogin}
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </Button>
              {/* <Button
                type="submit"
                fullWidth
                variant="outlined"
                onClick={() => alert("Sign in with Facebook")}
                startIcon={<FacebookIcon />}
              >
                Sign in with Facebook
              </Button> */}
            </Box>
          </Card>
        </SignInContainer>
      </ThemeProvider>
  );
};

export default Login;
