import { Button, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/apiServices";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/userSlice";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function goToSignUp() {
    navigate("/signup");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const result = await signIn(formData);
      if (result.token) {
        localStorage.setItem("token", result.token);
        const user = jwtDecode(result.token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setUser(user));
        navigate("/");
      } else {
        alert("Log-in Failed!");
      }
    } catch (error) {
      console.log("Error: ", error.message);
      alert("Log-in Failed!");
    }
  }

  return (
    <Paper
      component={"form"}
      onSubmit={handleSubmit}
      variant="outlined"
      className="p-5 max-w-[500px] mx-auto"
    >
      <div>
        <h2 className="text-2xl mb-4">LogIn</h2>
      </div>
      <div className="flex flex-col gap-4">
        <TextField id="email" name="email" label="Email" />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
        />
        <div className="flex flex-col gap-2">
          <Button type="submit" variant="contained">
            Log In
          </Button>
          <p className="text-center">or</p>
          <Button onClick={goToSignUp} variant="outlined">
            Sign Up
          </Button>
        </div>
      </div>
    </Paper>
  );
}

export default SignIn;
