import React, { useState, useContext,useEffect } from "react";
import "../App.css";
import { Context } from "../Context";
import {Link} from "react-router-dom"
function Signup() {
  const { signUp } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(undefined);

useEffect(() => {
    var preview = document.getElementById("file-ip-1-preview");
    preview.src =
      "https://res.cloudinary.com/instaclone1812/image/upload/v1600344194/no_pic_ugagm7.png";
    preview.style.display = "block";
  }, []);
    function showPreview(event) {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
  }
  function handleClick() {
    setLoading(true);
      var preview = document.getElementById("file-ip-1-preview");
  if (preview.src == "https://res.cloudinary.com/instaclone1812/image/upload/v1600344194/no_pic_ugagm7.png")
  {
      signUp(name, username, password, preview.src,setLoading);

  }
  else{
    signUp(name, username, password, file,setLoading);
  }}
  return (
    <React.Fragment>
      <div>
        <div className="card mycard">
          <span
            className="logo"
            style={{ fontSize: "70px", marginTop: "10px" }}
          >
            Sign Up
          </span>
          <div
            className="input-field"
            style={{ marginTop: "35px", marginBottom: "35px" }}
          >
            <input
              autoComplete="off"
              id="name"
              type="text"
              className="validate"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
          </div>
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



<input
            type="file"
            id="file-ip-1"
            accept="image/*"
            onChange={showPreview}
            style={{ display: "none" }}
          />
          <div className="card-image">
            <label htmlFor="file-ip-1">
              <div style={{display:'flex',alignItems:"center",justifyContent:"space-evenly"}}>
              <img id="file-ip-1-preview" className="my_image" style={{borderRadius:"50%",height:"150px",width:"150px",border:"0.01px solid grey"}}/>
              <h6 >
              Select A Profile Picture


              </h6>
              </div>
            </label>
          </div>

         
          {loading ? (
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
          ) : (
            <React.Fragment>
              <br/>
              <br/>
            <Link to = "/signin">
              Already have an account? Sign in
            </Link>
            <button
              className="waves-effect waves-light btn-large #039be5 light-blue darken-1"
              style={{ marginTop: "40px" }}
              onClick={handleClick}
            >
              Sign Up
            </button>
            </React.Fragment>

          
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Signup;
