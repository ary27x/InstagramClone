import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../Context";
import Header from '../components/Header'

function View() {
  

  function follow() {
    
    const { username, _id } = userData;
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
        console.log("the data is below")
        console.log(data.data);
        axios
      .post(
        "/data",
        { id },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((data) => {
        console.log("Received data is down below");
        console.log(data.data);
        setUserData(data.data.by)
        
        setPostData(data.data);
      })
      .catch((err) => {
        console.log(
          "Error occured on the server side while getting the data from the server"
        );
        console.log(err);
      });
      });
  }
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState("turned_in_not");
  const [showComment, setShowComment] = useState(false);
  const { likePost, unlikePost, postComment } = useContext(Context);
const token = localStorage.getItem("TOKEN")
  const [userData,setUserData] = useState(undefined)
 
  const [postData, setPostData] = useState(undefined);
  useEffect(() => {
    console.log("changed");
    if (postData !== undefined) {
      console.log(postData.likes.includes(user._id));
    }
  }, [postData]);
  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    axios
      .post(
        "/data",
        { id },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((data) => {
        console.log("Received data is down below");
        console.log(data.data);
        setUserData(data.data.by)
        setPostData(data.data);
      })
      .catch((err) => {
        console.log(
          "Error occured on the server side while getting the data from the server"
        );
        console.log(err);
      });
  }, []);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("USER"));
 if (token == null)
  {
    window.location = '/signin'
    return

  }
  if (postData != undefined)
  {
    console.log("the data of the post data is given below")
    console.log(postData)
  }

  return (
    <React.Fragment>
      {postData == undefined ? (
        <>
      <Header/>
        
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
        <>
      <Header/>

        <div class="row mycardPost" style={{marginBottom:"40px"}}>
          <div class="col s12 ">
            <div class="card">
              <div class="card-image">
                <div className="post-top">
                  <img
                    src={postData.by.profilePic}
                    className="post-top-image"
                  />
                  <p className="post-heading">
                    <Link
                      to={
                        postData.by.username == user.username
                          ? "/profile"
                          : `/user/${postData.by.username}`
                      }
                    >
                      <b className="creator">{postData.by.username}</b>
                    </Link>
                  </p>
                   {postData.by.followers.includes(user._id) || user.username == postData.by.username ? "" :(<button 
                   class="btn waves-effect waves-light #039be5 light-blue darken-1" 
                   type="submit" 
                   name="action"
                   style={{"marginLeft":"auto"}}
                   onClick={follow}
                   >Follow
    
  </button>) }
                  <i className="material-icons post-more">more_vert</i>
                </div>
                <img src={postData.picture} alt="" className="post-image" />
              </div>
              <div class="card-content card-things">
                <div className="icons-container">
                  <i
                    class="small material-icons pi post-like "
                    onClick={() => {
                      postData.likes.includes(user._id)
                        ? unlikePost(postData._id, setPostData)
                        : likePost(postData._id, setPostData);
                    }}
                    style={
                      postData.likes.includes(user._id)
                        ? {
                            color: "red",
                            fontSize: "30px",
                            MozUserSelect: "none",
                          }
                        : { fontSize: "30px", MozUserSelect: "none" }
                    }
                  >
                    {postData.likes.includes(user._id)
                      ? "favorite"
                      : "favorite_border"}
                  </i>

                  <i
                    class="small material-icons pi"
                    style={{ fontSize: "30px", MozUserSelect: "none" }}
                    onClick={() => {
                      setShowComment(!showComment);
                    }}
                  >
                    insert_comment
                  </i>
                  <i
                    class=" material-icons end pi "
                    onClick={(e) => {
                      if (saved == "turned_in_not") {
                        setSaved("turned_in");
                      } else {
                        setSaved("turned_in_not");
                      }
                    }}
                    style={
                      saved == "turned_in_not"
                        ? { fontSize: "30px", MozUserSelect: "none" }
                        : {
                            color: "blue",
                            fontSize: "30px",
                            MozUserSelect: "none",
                          }
                    }
                  >
                    {saved}
                  </i>
                </div>

                <div className="post-caption">
                  {postData.likes.length} likes
                  <br />
                  <b>{postData.by.username + "   "}</b>
                  {postData.caption}
                  <br />
                  <div
                    onClick={(e) => {
                      setShowComment(!showComment);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {showComment
                      ? "Hide Comments"
                      : postData.comments.length == 0
                      ? "0 Comments"
                      : postData.comments.length == 1
                      ? `View 1 Comment`
                      : `View All ${postData.comments.length} Comments`}
                  </div>
                  <div style={showComment ? {} : { display: "none" }}>
                    {postData.comments.map((item, i) => {
                      return (
                        <React.Fragment>
                          <div className="comment-grid">
                            <img
                              src={item.commentedBy.profilePic}
                              alt=""
                              style={{
                                width: "40px",
                                height: "40px",
                                marginLeft: "10px",
                                borderRadius: "50%",
                              }}
                            />

                            <b className="commented">
                              {item.commentedBy.username}
                            </b>
                            {item.comment}
                            <br />
                          </div>
                          {i == postData.comments.length - 1 ? (
                            ""
                          ) : (
                            <div display="flex">
                              <div
                                style={{
                                  height: "0.5px",
                                  width: "100%",
                                  backgroundColor: "black",
                                }}
                              ></div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  postComment(comment, postData._id, setPostData);
                  setComment("");
                }}
                style={showComment ? {} : { display: "none" }}
              >
                <input
                  type="text"
                  style={{
                    width: "90%",
                    marginLeft: "24px",

                    marginBottom: "15px",
                  }}
                  placeholder="Add Your Comment"
                  id="comment"
                  autoComplete="off"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
        </>
      )}
    </React.Fragment>
  );
}
export default View;
