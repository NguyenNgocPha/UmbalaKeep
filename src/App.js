import React, { Suspense, useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./component/Home";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { auth, db } from "./firebase-config";

import { getNote } from "app/noteSlice";
import { getTrash } from "app/trashSlice";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./features/login/Login";
import SignUp from "./features/login/SignUp";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("User is not logged in");
        return;
      }
      const action1 = getNote();
      const actionResult1 = await dispatch(action1);
      const currentUser1 = unwrapResult(actionResult1);

      const action3 = getTrash();
      const actionResult3 = await dispatch(action3);
      const currentUser3 = unwrapResult(actionResult3);
    });

    return () => unregisterAuthObserver();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="home/*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
