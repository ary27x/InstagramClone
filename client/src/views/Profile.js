import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Context";
import ProfileWelcome from "../components/ProfileWelcome";
import ProfilePosts from "../components/ProfilePosts";
import Header from '../components/Header'

function Profile() {
  const { getProfile, profile } = useContext(Context);

  useEffect(() => {
    getProfile();
  }, []);
  useEffect(() => {}, [profile]);
  if (localStorage.getItem("TOKEN") == null) {
    window.location = "/signin";
    return;
  }

  return (
    <React.Fragment>
      <Header/>

      {profile == null ? (
        <h1 className="profile-loading">"Loading..."</h1>
      ) : (
        <React.Fragment>
          <ProfileWelcome main={profile} />
          <ProfilePosts />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Profile;
