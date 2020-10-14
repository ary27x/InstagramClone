import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from '../components/Header'

function User() {
  const [userData, setUserData] = useState(undefined);
  const { username } = useParams();
  function follow() {
    console.log('follow')
    const { username, _id } = userData;
    console.log(username)
    const token = localStorage.getItem("TOKEN");
    axios
      .post(
        "/follow",
        { username, _id },
        {
          headers: {
            authorization: token,
          },
        }
      )

      .then((data) => {
        console.log(data.data);
        setUserData(data.data);
      });
  }
  function unfollow() {
    
    console.log("unfolowing");
    const { username, _id } = userData;
    const token = localStorage.getItem("TOKEN");
    axios
      .post(
        "/unfollow",
        { username, _id },
        {
          headers: {
            authorization: token,
          },
        }
      )

      .then((data) => {
        console.log(data.data);
        setUserData(data.data);
      });
  }
  useEffect(() => {
  
    const currentUser = JSON.parse(localStorage.getItem("USER"));

    if (currentUser.username == username) {
      window.location = "/profile";
      return;
    }

    const token = localStorage.getItem("TOKEN");
    axios
      .post(
        "/user",
        { username },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((data) => {
        console.log(data.data)
        setUserData(data.data);
      })
      .catch((err) => {
        console.log(
          "Erroroccured while getting the data about the user from the client side"
        );
        console.log(err);
      });
  }, []);
    
  return userData == undefined ? (
    <> 
    <Header/>

     <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
         
         <div className="last-loader" id="post-last-loader">
          <div className="preloader-wrapper big active last-item">
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
  </>
  ) : (
    <React.Fragment>
     
      <Header/>
      
     
      
      <div className="mycontainer-wrapper">
        <div style={{display:"flex",marginTop:"3vw",marginBottom:"3vh"}}>
          <img src={userData.profilePic} style={{width:"150px",height:"150px",borderRadius:"50%"}}/>
          <div style={{display:"flex",flexDirection:"column",marginLeft:"3vw"}}>
  <p>{userData.username}</p>
  <p style={{marginBottom:"0px",marginTop:"0px"}}>{userData.name}</p>
          <p> {userData.posts == undefined ? 0 : userData.posts.length} posts{" "}
          {userData.followers == undefined ? 0 : userData.followers.length}{" "}
          <Link to={`/followers/${userData.username}`} style={{color:"black"}}>followers</Link>
          
        {" "}
          {userData.followings == undefined
            ? 0
            : userData.followings.length}{" "}
          <Link to={`/followings/${userData.username}`} style={{color:"black"}}>followings</Link>

          {" "}</p>
             <div className="buttons">
          <button
            class="waves-effect waves-light btn action-new #039be5 light-blue darken-1 "
            onClick={() => {
              userData.followers.includes(
                JSON.parse(localStorage.getItem("USER"))._id
              )
                ? unfollow()
                : follow();
            }}
          >
            {userData.followers.includes(
              JSON.parse(localStorage.getItem("USER"))._id
            )
              ? "Unfollow"
              : "Follow"}
          </button>
        </div>

          </div>
          
        </div>
    
      </div>
      <hr />
      <div className="profile-post-top">
        <div className="profile-post">
          {userData.posts.map((item) => (
            <img
              src={item.picture}
              alt=""
              
              key={item._id}
              onClick={(e) => {
                window.location = `/view/${item._id}`;
              }}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
export default User;
