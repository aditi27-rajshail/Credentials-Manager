import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../App.css";
import { useAppState } from "../state/useAppState";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setUserID } = useAppState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("cehck ");
      const response = await api.post("/api/login/", {
        email: email,
        password: password,
      });
      console.log("cehck response", response);
      localStorage.setItem("token", response.data.token);
      setUserID(response.data.user_id);
      localStorage.setItem("id", response.data.user_id);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
