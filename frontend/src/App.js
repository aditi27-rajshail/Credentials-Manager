import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NavigationBar from "./components/NavigationBar";
import "./App.css";
import { AppStateProvider } from "./state/useAppState";

function App() {
  return (
    <AppStateProvider>
      <Router>
        <NavigationBar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AppStateProvider>
  );
}

export default App;
