import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import Tilt from 'react-tilt'
import { Link } from "react-router-dom";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <Tilt options={{ max : 25 }}>
          <h3 className="registerLogo">Message <span style={{"color":"#ea4f4c"}}>App</span></h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Messsage App.
          </span>
        </Tilt>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="registerInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="registerInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="registerInput"
              type="password"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="registerRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}