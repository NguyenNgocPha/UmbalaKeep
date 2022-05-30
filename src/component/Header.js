import { height } from "@mui/system";
import React, { useEffect, useState } from "react";
import "../css/Header.css";
import { auth, db } from "../firebase-config";
import Home from "./home";
import Footer from "./Footer";
import Trash from "./Trash";
import SignUp from "./login/SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
function Header() {
  let navigate = useNavigate();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigate(`/sign-in`);
      })
      .catch((error) => alert(error.message));
  };
  const [notes, setNotes] = useState([]);

  return (
    <div>
      <div class="containerHeader">
        <div class="containerHeaderLeft">
          <div class="iconHeaderLeft">
            <i class="fa-solid fa-bars"></i>
          </div>
          <img
            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
            alt="no find"
            width={40}
            height={40}
          ></img>
          <div>UMBALA Keep</div>
        </div>
        <div class="containerHeaderCenter">
          <div
            style={{
              width: 700,
              height: 48,
              paddingLeft: 10,
              background: "rgb(239, 239, 239)",
              borderRadius: 7,
            }}
          >
            <form class="search-form">
              <div class="row" style={{ alignItems: "center" }}>
                <div class="iconHeaderLeft">
                  <i
                    class="fa-solid fa-magnifying-glass"
                    style={{
                      color: "#A4A4A4",
                    }}
                  ></i>
                </div>
                <input
                  type="search"
                  value=""
                  placeholder="Search"
                  class="search-input"
                  style={{
                    width: 594,
                    border: "none",
                    background: "rgb(239, 239, 239)",
                    color: "#A4A4A4",
                  }}
                />
                <div class="iconHeaderLeft">
                  <i class="fa-solid fa-xmark"></i>
                </div>
              </div>
            </form>
          </div>
          <div style={{ width: 164, paddingLeft: 20 }}>
            <div class="row">
              <div class="iconHeaderLeft">
                <i class="fa-solid fa-arrow-rotate-right"></i>
              </div>
              <div class="iconHeaderLeft">
                <i
                  class="fa-solid fa-right-from-bracket"
                  onClick={handleSignOut}
                ></i>
              </div>
              <div class="iconHeaderLeft">
                <i class="fa-solid fa-gear"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="containerHeaderRight">
          <div class="row">
            <div class="iconHeaderLeft">
              <i class="fa-solid fa-table-cells"></i>
            </div>
            <div style={{ width: 150, height: 48 }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png"
                alt="no find"
                width={48}
                height={48}
              ></img>
            </div>
          </div>
        </div>
      </div>

      <div class="containerCenter">
        <div class="containerCenterLeft">
          <Link to="/home/" class="link">
            <div
              class="row"
              style={{ fontSize: 20, alignItems: "center", height: 48 }}
            >
              <div style={{ width: 80, textAlign: "center" }}>
                <i class="fa-solid fa-lightbulb"></i>
              </div>
              <div style={{ width: 200, fontSize: 14 }}>Notes</div>
            </div>
          </Link>

          <Link to="/" class="link">
            <div
              class="row"
              style={{ fontSize: 20, alignItems: "center", height: 48 }}
            >
              <div style={{ width: 80, textAlign: "center" }}>
                <i class="fa-solid fa-bell"></i>
              </div>
              <div style={{ width: 200, fontSize: 14 }}>Reminders</div>
            </div>
          </Link>
          <Link to="/" class="link">
            <div
              class="row"
              style={{ fontSize: 20, alignItems: "center", height: 48 }}
            >
              <div style={{ width: 80, textAlign: "center" }}>
                <i class="fa-solid fa-folder-plus"></i>
              </div>
              <div style={{ width: 200, fontSize: 14 }}>Archive</div>
            </div>
          </Link>
          <Link to="/home/trash" class="link">
            <div
              class="row"
              style={{ fontSize: 20, alignItems: "center", height: 48 }}
            >
              <div style={{ width: 80, textAlign: "center" }}>
                <i class="fa-solid fa-trash"></i>
              </div>
              <div style={{ width: 200, fontSize: 14 }}>Trash</div>
            </div>
          </Link>
          <Footer />
        </div>
        <div class="containerCenterRight">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="invoices" element={<Trash />} />
            <Route path="trash" element={<Trash />} />
          </Routes>
        </div>
      </div>
      <div class="containerFooter"></div>
    </div>
  );
}

export default Header;
