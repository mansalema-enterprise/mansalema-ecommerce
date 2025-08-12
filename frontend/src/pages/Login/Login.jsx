import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { ShopContext } from "../../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../App";

const Login = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    if (currentState === "Sign Up") {
      const response = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);

        // ⬇️ NEW: redirect to returnTo if present
        const params = new URLSearchParams(window.location.search);
        const returnTo = params.get("returnTo");
        if (returnTo) {
          navigate(returnTo);
        } else {
          navigate("/");
        }
      } else {
        toast.error(response.data.message);
      }
    } else {
      const response = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);

        // ⬇️ NEW: redirect to returnTo if present
        const params = new URLSearchParams(window.location.search);
        const returnTo = params.get("returnTo");
        if (returnTo) {
          navigate(returnTo);
        } else {
          navigate("/");
        }
      } else {
        toast.error(response.data.message);
      }
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

  

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="auth-form">
        <div className="form-header">
          <p className="form-title">{currentState}</p>
          {currentState === "Login" ? null : (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="form-input"
              placeholder="Name"
              required
            />
          )}
        </div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="form-input"
          placeholder="Email"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="form-input"
          placeholder="Password"
          required
        />
        <div className="form-footer">
          {currentState === "Login" ? (
            <p
              className="toggle-auth-state"
              onClick={() => setCurrentState("Sign Up")}
            >
              Create Account
            </p>
          ) : (
            <p
              className="toggle-auth-state"
              onClick={() => setCurrentState("Login")}
            >
              Login
            </p>
          )}
        </div>
        <button className="form-button">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
