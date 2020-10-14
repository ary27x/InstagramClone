import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Context";
import "../Explore.css";
import Header from '../components/Header'

import axios from "axios";
function Explore() {
  const { exploreData, getExplorePosts } = useContext(Context);
  useEffect(() => {
    getExplorePosts();
  }, []);
  const [search, setSearch] = useState("");

  function find(e) {
    setSearch(e.target.value);
  }
  useEffect(() => {
    if (search == "") {
      const place = document.getElementById("results-data");
      if (place !== null) {
        place.innerHTML = "";
      }
      return;
    }
    const place = document.getElementById("results-data");
    place.innerHTML = "";
    if (search !== "") {
      axios
        .post("/search", { text: search })
        .then((data) => {
          console.log("received data after searching for the term");
          place.innerHTML = "";

          data.data.map((item, i) => {
            console.log(item.username);
            const data = (
              <React.Fragment>
                <h4 style={{ color: "black" }}>{item.username}</h4>
                <br />
              </React.Fragment>
            );

            const main = document.createElement("div");
            main.className = "result-container";

            const image = document.createElement("img");
            image.src = item.profilePic;
            image.className = "main-data";
            image.onclick = function () {
              window.location = `/user/${item.username}`;
            };
            const name = document.createElement("h6");
            name.innerHTML = item.username;
            name.onclick = function () {
              window.location = `/user/${item.username}`;
            };
            main.appendChild(image);
            main.appendChild(name);
            place.append(main);
            return;
          });
        })
        .catch((err) => {
          console.log("Error occured while retriving data on the front end");
          console.log(err);
        });
    }
  }, [search]);
const footerStyle = window.innerWidth < 1000 ? { marginTop: "5px",marginBottom:"50px" } : {marginTop:"5px"}
  return (
    <React.Fragment>
      <Header/>
      {exploreData == null ? (
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
      ) : (
        <React.Fragment>
          <nav
            className="#ffffff white
              "
            className="search-bar"
          >
            <div class="nav-wrapper">
              <form>
                <div class="input-field">
                  <input
                    id="search"
                    type="search"
                    required
                    autoComplete="off"
                    value={search}
                    onChange={find}
                    style={{ marginBottom: "0px" }}
                    placeholder="Search"
                    className="search-input"
                  />
                  <div
                    id="results-data"
                    style={{
                      color: "black",
                      backgroundColor: "white",
                      marginLeft: "3px",
                    }}
                    className="results-data"
                  ></div>
                  <label class="label-icon" for="search">
                  </label>
                </div>
              </form>
            </div>
          </nav>

          <div className="explore-main">
            <div className="explore-container">
              {exploreData.map((item, i) => {
                return (
                  <div className={i % 5 == 0 ? "big" : ""}>
                    <img
                      src={item.picture}
                      alt=""
                      key={item._id}
                      onClick={() => {
                        window.location = `/view/${item._id}`;
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="my-footer" style={footerStyle}>
            <p className="footer-start">© Made By Aryan Kumar</p>
            <p className="footer-end">ary27x</p>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default Explore;
