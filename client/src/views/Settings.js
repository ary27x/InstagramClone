import React, { useContext,useEffect,useState } from "react";
import { Context } from "../Context";
import "../Profile.css";
import Header from '../components/Header'

function Settings() {
  const [username,setUsername] = useState("") 
  useEffect(() => {
     const user = JSON.parse(localStorage.getItem("USER"))
     setUsername(user.username)
  },[])
  const { signOut } = useContext(Context);
  return (
    <React.Fragment>
      <Header/>

      
      <div className="main-flex">

<h3>
  Currently logged in as:{" "}<b>{username}</b> 
  </h3>

        <button onClick={signOut}>Sign Out</button>
        
      </div>
    </React.Fragment>
  );
}
export default Settings;
