import React from "react";
import "../css/Header.css";
import { auth } from "../firebase-config";
import Notes from "../features/Notes";
import Footer from "./Footer";
import Trash from "../features/Trash";

import imdga from "asset/search.svg";
import note from "asset/note.svg";
import remin from "asset/remin.svg";
import archive from "asset/archive.svg";
import trash from "asset/trash.svg";
import Archive from "./Archive";
import { CgMenuGridO } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
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

  return (
    <div>
      <div class="containerHeader">
        <div class="containerHeaderLeft">
          <div class="iconHeaderLeft">
            <i class="fa-solid fa-bars" width={50}></i>
          </div>
          <img
            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
            alt="no find"
            width={40}
            height={40}
          ></img>
          <div
            style={{ fontSize: 22, color: "rgb(95, 99, 104)", fontWeight: 400 }}
          >
            Keep
          </div>
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
                  <img src={imdga} alt="no find" style={{ top: 0 }}></img>
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
                <AiOutlineSetting fontSize={25} />
              </div>
            </div>
          </div>
        </div>
        <div class="containerHeaderRight">
          <div class="row">
            <div class="iconHeaderLeft">
              <CgMenuGridO fontSize={25} />
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
          <div class="sliderbar">
            <Link to="/home/" class="link">
              <div
                class="row"
                style={{ fontSize: 20, alignItems: "center", height: 48 }}
              >
                <div style={{ marginLeft: 10, width: 70, textAlign: "center" }}>
                  <img src={note} alt="no find" style={{ top: 0 }}></img>
                </div>
                <div style={{ width: 200, fontSize: 14 }}>Notes</div>
              </div>
            </Link>
          </div>
          <div class="sliderbar">
            <Link to="/home/active" class="link">
              <div
                class="row"
                style={{ fontSize: 20, alignItems: "center", height: 48 }}
              >
                <div style={{ marginLeft: 10, width: 70, textAlign: "center" }}>
                  <img src={remin} alt="no find" style={{ top: 0 }}></img>
                </div>
                <div style={{ width: 200, fontSize: 14 }}>Reminders</div>
              </div>
            </Link>
          </div>
          <div class="sliderbar">
            <Link to="/home/active" class="link">
              <div
                class="row"
                style={{ fontSize: 20, alignItems: "center", height: 48 }}
              >
                <div style={{ marginLeft: 10, width: 70, textAlign: "center" }}>
                  <img src={archive} alt="no find" style={{ top: 0 }}></img>
                </div>
                <div style={{ width: 200, fontSize: 14 }}>Archive</div>
              </div>
            </Link>
          </div>
          <div class="sliderbar">
            <Link to="/home/trash" class="link">
              <div
                class="row"
                style={{ fontSize: 20, alignItems: "center", height: 48 }}
              >
                <div style={{ marginLeft: 10, width: 70, textAlign: "center" }}>
                  <img src={trash} alt="no find" style={{ top: 0 }}></img>
                </div>
                <div style={{ width: 200, fontSize: 14 }}>Trash</div>
              </div>
            </Link>
          </div>
          <Footer />
        </div>
        <div class="containerCenterRight">
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="active" element={<Archive />} />
            <Route path="trash" element={<Trash />} />
          </Routes>
        </div>
      </div>
      <div class="containerFooter"></div>
    </div>
  );
}

export default Header;
