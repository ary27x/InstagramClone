import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import {Link} from 'react-router-dom'
import "../Main.css";
import Post from "../components/Post";
import Header from '../components/Header'

function Main() {
  const [temp, setTemp] = useState(true);
  
  const {
    allData,
    getPosts,
    getNewPosts,
    setSkip,
    skip,
    stop,
    profile,
  } = useContext(Context);
  useEffect(() => {
    if (!temp) {
      setSkip(skip + 4);
    }
  }, [temp]);
  useEffect(() => {
    if (skip >= 4) {
      getNewPosts();
    }
  }, [skip]);
  const loading = (
    <div class="progress loading">
      <div class="indeterminate"></div>
    </div>
  );
  const nothing = (<React.Fragment>
<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
<br/>
<br/>
<br/>

<h5>
  There is nothing to view over here!!  
  </h5>
  <div>
    
  </div>

<Link to="/explore">
   <a class="waves-effect waves-teal btn-flat  #039be5 light-blue darken-1" style={{color:"white"}}>Explore other posts and follow other users</a>

</Link>
   <br/>
   <Link to="/new">
   <a class="waves-effect waves-teal btn-flat  #039be5 light-blue darken-1" style={{color:"white"}}>Create a new post</a>
 </Link>
</div>
  </React.Fragment>)
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    if (rect.top <= window.innerHeight) {
      return true;
    } else {
      return false;
    }

  }
  useEffect(() => {
    document.addEventListener("scroll", () => {
      const load_last = document.querySelector("#post-last-loader");
      if (load_last !== null) {
        if (isInViewport(load_last) && temp) {
          setTemp(false);
        } else {
          setTemp(true);
        }
      }
    });
    if (allData == null) {
      getPosts();
    }
  }, []);

  if (localStorage.getItem("TOKEN") == null) {
    window.location = "/signin";
    return;
  }
  function show() {
    if (allData.length == 0) {
      return (
        <>
        <Header/>      
        {nothing}       
        </>
        );
    }   
    else {
      return (
        <>
        <Header/>
        <div className="main-posts" style={{paddingBottom:"50px"}}>
          {allData.map((item) => (
            <Post key={item._id} data={item} />
          ))}
        </div>
        </>
      );
    }
  }

console.log(allData == [])
  return (
    <React.Fragment>
      {allData == null ? loading : show()}

      {stop ? (

      ""
        ) : ( 
       allData == null ? "":
        allData.length != 0 ?
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
        </div> : ""
      )}
    </React.Fragment>
  );
}
export default Main;
