import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../Main.css";
function ProfileWelcome(props) {
  return (
    <React.Fragment>
      <div className="mycontainer-wrapper">
        <div style={{display:"flex",marginTop:"3vw",marginBottom:"3vh"}}>
          <img src={props.main.profilePic} style={{width:"150px",height:"150px",borderRadius:"50%"}}/>
          <div style={{display:"flex",flexDirection:"column",marginLeft:"3vw"}}>
  <p>{props.main.username}</p>
  <p style={{marginBottom:"0px",marginTop:"0px"}}>{props.main.name}</p>
          <p> {props.main.posts == undefined ? 0 : props.main.posts.length} posts{" "}
          {props.main.followers == undefined ? 0 : props.main.followers.length}{" "}
          <Link to={`/followers/${props.main.username}`} style={{color:"black"}}>followers</Link>
          {" "}
          {props.main.followings == undefined
            ? 0
            : props.main.followings.length}{" "}
          <Link to={`/followings/${props.main.username}`} style={{color:"black"}}>followings</Link>{" "}</p>
           <div className="buttons">
          <Link
            to="/new"
            class="waves-effect waves-light btn action-new #039be5 light-blue darken-1 "
          >
            New Post
          </Link>
          <Link
            to="/settings"
            class="waves-effect waves-light btn action #212121 grey darken-4 "
          >
            Settings
          </Link>
        </div>

          </div>
          
        </div>
    
      </div>
      <hr />
  
    </React.Fragment>
  );
}
export default ProfileWelcome;
