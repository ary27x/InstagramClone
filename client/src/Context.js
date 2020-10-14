import React, { useEffect, useState } from "react";
import axios from "axios";
const Context = React.createContext();
function ContextProvider(props) {
  const [tokenExists, setTokenExists] = useState(true);
  const [allData, setAllData] = useState(null);
  const [skip, setSkip] = useState(0);
  const [stop, setStop] = useState(false);
  const [profile, setProfile] = useState("");
  const [exploreData, setExploreData] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("TOKEN") == null) {
      setTokenExists(false);
    }
  }, []);
  function getPosts() {
    const token = localStorage.getItem("TOKEN");

    if (token == null) {
      window.location = "/signin";
      return;
    }
    
    axios
      .post(
        "/",
        { skip },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((datax) => {
        if (datax.data.error) {
          localStorage.getItem("TOKEN");

          localStorage.removeItem("TOKEN");
          window.location = "/signin";
          return;
        }
        if (datax.data.length < 4)
        {
          setStop(true)
        }
        setAllData(datax.data);
      });
  }
  function getExplorePosts() {
    const token = localStorage.getItem("TOKEN");

    if (token == null) {
      window.location = "/signin";
      return;
    }
    axios
      .post(
        "/explore",
        { skip },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((datax) => {
        if (datax.data.error) {
          localStorage.getItem("TOKEN");

          localStorage.removeItem("TOKEN");
          window.location = "/signin";
          return;
        }
        setExploreData(datax.data);
      });
  }

  function getNewPosts() {
    if (stop) {
      return;
    }
    const token = localStorage.getItem("TOKEN");

    if (token == null) {
      window.location = "/signin";
      return;
    }
    axios
      .post(
        "/",
        { skip },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((datax) => {

        
        if (datax.data.error) {
          localStorage.getItem("TOKEN");

          localStorage.removeItem("TOKEN");
          window.location = "/signin";
          return;
        }
        if (allData !== null) {
          const mainDataInsert = [...allData, ...datax.data];
       

          if (datax.data.length < 4) {
            setStop(true);
          }
          setAllData(mainDataInsert);
        }
      });
  }
  function upload(image, caption) {
    const reader = new FileReader();
    reader.readAsDataURL(image)
    reader.onload = function()
    {

const picture = reader.result;
        const token = localStorage.getItem("TOKEN");

 axios
          .post(
            "/add",
            { picture, caption },
            {
              headers: {
                authorization: token,
              },
            }
          )
          .then(() => {
            window.location = "/";
            return
          });
    }
   
  }
  function signUp(name, username, password, file,pass) {
  
    if (!name || !username || !password) {
      alert("Please Enter All The Fields");
      pass(false)
      return;
    }
    if (file == "https://res.cloudinary.com/instaclone1812/image/upload/v1600344194/no_pic_ugagm7.png")
    {
      const profilePicture = file
      axios.post("/signup",
            {  name,
            username,
            password,
            profilePicture, }
          )
          .then((err) => {
            if (err.data.err)
            {
              alert(err.data.err)
              pass(false)
              return
            }
            else{
           signIn(username, password);
          }}).catch(() => {
           
            return

          });
          return
    }
    else{
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = function()
    {
const profilePicture = reader.result;

 axios.post("/signup",
            {  name,
            username,
            password,
            profilePicture, }
          )
          .then((err) => {
            if (err.data.err)
            {
              alert(err.data.err)
              pass(false)
              return
            }
            else{
           signIn(username, password);
          }}).catch(() => {
           
            return

          });
    }}
  }
  function signIn(username, password,pass) {
    if (!username || !password) {
pass(false)
     
      alert("Please Enter All Fields");
      return;
    }
    axios
      .post("/signin", { username, password })
      .then((response) => {
        if (response.data.error) {
          pass(false)

          alert(response.data.error);
          
          return;
        }

        localStorage.setItem("USER", JSON.stringify(response.data.user));
        localStorage.setItem("TOKEN", response.data.TOKEN);
        setTokenExists(true);
        window.location = "/";
      })
      .catch((err) => {});
  }
  function signOut() {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER");
    window.location = "/signin";

    return;
  }
  function getProfile() {
    const token = localStorage.getItem("TOKEN");

    axios
      .get("/profile", {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        if (response.data.error) {
          setTokenExists(false);

          window.location = "/signin";
          return "err";
        }
        const recvData = response.data;
        setProfile(recvData);
      })
      .catch((err) => {
        return "err";
      });
  }
  function likePost(id, pass) {

    const token = localStorage.getItem("TOKEN");
    axios
      .post(
        "/like",
        { id },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((dataLike) => {

        if (pass) {
          pass(dataLike.data);
          return;
        }
        const updatedData = allData.map((item) => {
          if (item._id == dataLike.data._id) {
            return dataLike.data;
          }
          return item;
        });
       
        setAllData(updatedData);
      })
      .catch((err) =>{} );
  }
  function unlikePost(id, pass) {
    const token = localStorage.getItem("TOKEN");
    axios
      .post(
        "/unlike",
        { id },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((dataLike) => {
        if (pass) {
          pass(dataLike.data);
          return;
        }
       

        const updatedData = allData.map((item) => {
          if (item._id == dataLike.data._id) {
            return dataLike.data;
          }
          return item;
        });
       
        setAllData(updatedData);
      })
      .catch((err) => {});
  }
  function postComment(comment, id, pass) {
    const token = localStorage.getItem("TOKEN");
    axios
      .post(
        "/comment",
        { comment, id },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((data) => {
        

        if (pass) {
          pass(data.data);
          return;
        }

        const updatedData = allData.map((item) => {
          if (item._id == data.data._id) {
            return data.data;
          }
          return item;
        });
        
        setAllData(updatedData);
      })
      .catch((err) => {
       
      });
  }
  return (
    <Context.Provider
      value={{
        signUp,
        signIn,
        getProfile,
        tokenExists,
        signOut,
        upload,
        getPosts,
        allData,
        getNewPosts,
        setSkip,
        skip,
        stop,
        profile,
        likePost,
        unlikePost,
        postComment,
        exploreData,
        setExploreData,
        getExplorePosts,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
export { Context, ContextProvider };
