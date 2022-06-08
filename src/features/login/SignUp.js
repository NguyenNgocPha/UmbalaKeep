import React, { useEffect, useState } from "react";
import "../../css/SignUp.css";
import { auth, db } from "firebase-config";
import { useNavigate } from "react-router-dom";

function SignUp() {
  let navigate = useNavigate();
  const [data, setData] = useState("");
  const chandleSignIn = () => {
    navigate(`/sign-in`);
  };

  const handleSignIn = () => {
    if (data.name === "" || data.age < 0) {
      alert("Please fill full name and valid age!");
    } else {
      auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user.uid);

          const patient = {
            Name: data.name,
            Age: data.age,
            UserID: user.uid,
          };

          const myDoc = db
            .collection("users")
            .doc(user.uid)
            .set({ patient })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        })
        .catch((error) => alert(error.message));
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate(`/sign-in`);
      }
    });

    return unsub;
  }, []);

  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Registered User</h3>
            <div className="mb-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                onChange={(event) =>
                  setData({ ...data, name: event.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label>Age</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Age"
                onChange={(event) =>
                  setData({ ...data, age: event.target.value })
                }
              />
            </div>

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
              <p className="forgot-password text-right">
                Not registered{" "}
                <a onClick={chandleSignIn} style={{ color: "#167bff" }}>
                  sign in?
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
