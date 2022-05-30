import React, { useEffect, useState } from "react";
import "../../css/SignUp.css";
import { auth, db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [data, setData] = useState("");
  const chandleSignOut = () => {
    navigate(`/sign-up`);
  };

  const handleSignIn = () => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("ok");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate(`/home`);
      }
    });

    return unsub;
  }, []);
  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(event) =>
                  setData({ ...data, email: event.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(event) =>
                  setData({ ...data, password: event.target.value })
                }
              />
            </div>
            <div className="d-grid">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSignIn}
              >
                Submit
              </button>
            </div>
            <div className="mb-3 row">
              <p className="forgot-password text-start">
                <span>
                  {" "}
                  Not registered{" "}
                  <a onClick={chandleSignOut} style={{ color: "#167bff" }}>
                    sign up?
                  </a>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
