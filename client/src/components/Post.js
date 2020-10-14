import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import "../Main.css";
function Post(props) {
  const [comment, setComment] = useState("");
  const [saved, setSaved] = useState("turned_in_not");
  const [showComment, setShowComment] = useState(false);
  const { likePost, unlikePost, postComment } = useContext(Context);

  const user = JSON.parse(localStorage.getItem("USER"));
  return (
    <React.Fragment>
      <div class="row mycardPost">
        <div class="col s12 ">
          <div class="card">
            <div class="card-image">
              <div className="post-top">
                
                <img
                  src={props.data.by.profilePic}
                  className="post-top-image"
                />
                <p className="post-heading">
                  <Link
                    to={
                      props.data.by.username == user.username
                        ? "/profile"
                        : `/user/${props.data.by.username}`
                    }
                  >
                    <b className="creator">{props.data.by.username}</b>
                  </Link>
                </p>
                <i className="material-icons post-more">more_vert</i>
              </div>
              <img src={props.data.picture} alt="" className="post-image" />
            </div>
            <div class="card-content card-things">
              <div className="icons-container">
                <i
                  class="small material-icons pi post-like "
                  onClick={() => {
                    props.data.likes.includes(user._id)
                      ? unlikePost(props.data._id)
                      : likePost(props.data._id);
                  }}
                  style={
                    props.data.likes.includes(user._id)
                      ? {
                          color: "red",
                          fontSize: "30px",
                          MozUserSelect: "none",
                        }
                      : { fontSize: "30px", MozUserSelect: "none" }
                  }
                >
                  {props.data.likes.includes(user._id)
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
                          
                          fontSize: "30px",
                          MozUserSelect: "none",
                        }
                  }
                >
                  {saved}
                </i>
              </div>

              <div className="post-caption">
                {props.data.likes.length} likes
                <br />
                <b>{props.data.by.username + "   "}</b>
                {props.data.caption}
                <br />
                <div
                  onClick={(e) => {
                    setShowComment(!showComment);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {showComment
                    ? "Hide Comments"
                    : props.data.comments.length == 0
                    ? "0 Comments"
                    : props.data.comments.length == 1
                    ? `View 1 Comment`
                    : `View All ${props.data.comments.length} Comments`}
                </div>
                <div style={showComment ? {} : { display: "none" }}>
                  {props.data.comments.map((item, i) => {
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
                        {i == props.data.comments.length - 1 ? (
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
                postComment(comment, props.data._id);
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
                id="comment-data"
                autoComplete="off"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Post;
