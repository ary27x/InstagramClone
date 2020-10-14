import React, { useContext, useEffect } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import "../Profile.css";
function ProfilePosts() {
  const { profile } = useContext(Context);
  const renderData =
    profile == "" ? (
      <div
        class="progress"
        style={{
          width: "30vw",
          margin: "20vh auto",
        }}
      >
        <div class="indeterminate"></div>
      </div>
    ) : (
   
      <div className="profile-post-top">
        <div className="profile-post">
          {profile.posts.map((item) => (
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
    );
  return <React.Fragment>{renderData}</React.Fragment>;
}
export default ProfilePosts;
