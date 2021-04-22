import React, { useContext, useState } from "react";
import Logo from "./aparat.jpg";
import "./navbar.css";
import { MenuContext } from "react-flexible-sliding-menu";
import { Link } from "react-router-dom";
import SignIn from "../signIn/SignIn";
import SingUp from "../signUp/SingUp";

function Navbar(props) {
  const [showModal, setShowModal] = useState(false);
  const { toggleMenu } = useContext(MenuContext);

  function showUserModal() {
    setShowModal(!showModal);
  }
  return (
    <div
      className="container-fluid d-flex justify-content-between  align-items-center flex-wrap px-3 py-2 mb-4 "
      id="nav"
    >
      <div className="d-flex align-items-center">
        <div className="ham-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link to="/">
          <img src={Logo} id="logo" alt="aparat logo" />
        </Link>
      </div>

      <div className="input-container">
        <input
          type="text"
          id="search"
          placeholder="عنوان مورد نظر را وارد کنید..."
          onKeyUp={(e) => {
            props.searchVideo(e.target.value);
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="d-flex">
        {props.token ? (
          <>

          <Link to="/dashboard"><button className="mx-2 logout"> پنل کاربری</button></Link> 
          <button className="mx-2 logout" onClick={()=>props.setToken(false)}>خروج از حساب کاربری</button>
          </>
        ) : (
          <>

            <div className="lr-container">
              <button onClick={showUserModal}>ورود یا ثبت نام</button>
            </div>
          </>
        )}
      </div>
      {showModal && (
        <div className="user-modal">
          <button onClick={showUserModal} className="close-user-modal">
            X
          </button>
          <p className="text-center">ورود یا ثبت نام</p>
          <hr />
          <p className="text-center">ورود</p>
          <SignIn setToken={props.setToken} showUserModal={showUserModal} />
          <hr />
          <p className="text-center">ثبت نام</p>
          <SingUp />
        </div>
      )}
    </div>
  );
}

export default Navbar;
