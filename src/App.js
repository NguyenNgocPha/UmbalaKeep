import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "../src/component/Header";
import Footer from "../src/component/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import Login from "../src/component/login/Login";
import SignUp from "../src/component/login/SignUp";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home/*" element={<Header />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
