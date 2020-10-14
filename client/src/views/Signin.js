import React, { useState, useContext } from "react";
import { Context } from "../Context";
import {Link} from 'react-router-dom'
import "../App.css";
function Signin() {
  const { signIn } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const [loading,setLoading] = useState(false)
  function handleClick() {
    console.log('clicked!!')
setLoading(true)
    signIn(username, password,setLoading);
  }
  return (
    <React.Fragment>
      <div>
        <div className="card mycard">
          <span
            className="logo"
            style={{ fontSize: "70px", marginTop: "10px" }}
          >
            Sign In
          </span>
          <div
            className="input-field"
            style={{ marginTop: "35px", marginBottom: "35px" }}
          >
            <input
              autoComplete="off"
              id="username"
              type="text"
              className="validate"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div
            className="input-field "
            style={{ marginTop: "35px", marginBottom: "35px" }}
          >
            <input
              autoComplete="off"
              id="password"
              type="password"
              className="validate"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
         
          {loading ? (
            <>
            <br/>
            <br/>
            
            <div style={{display:"flex",justifyContent:"center"}}>
          
          <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-red">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-yellow">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>

              <div className="spinner-layer spinner-green">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
            </div>
            </>
            ):    (
           
           <>
            <Link to='/signup'>
            Don't have an account? Register
          </Link>
            <button
            className="waves-effect waves-light btn-large #039be5 light-blue darken-1"
            style={{ marginTop: "40px" }}
            onClick={handleClick}
          >
            Sign In
          </button>
        </>
        ) }
      </div>
      
      </div>
    </React.Fragment>
  );
}
export default Signin;
