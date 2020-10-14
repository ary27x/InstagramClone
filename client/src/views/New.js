import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Context";
import "../New.css";
import Header from '../components/Header'

function New() {
  const { upload } = useContext(Context);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(undefined);
  
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    var preview = document.getElementById("file-ip-1-preview");
    preview.src =
      "https://res.cloudinary.com/instaclone1812/image/upload/v1600345462/select_pic_kw9gj3.png";
    preview.style.display = "block";
  }, []);
  function handleClick() {
    var preview = document.getElementById("file-ip-1-preview");
    if (
      preview.src ==
      "https://res.cloudinary.com/instaclone1812/image/upload/v1600345462/select_pic_kw9gj3.png"
    ) {
      alert("Please Select An Image To Post");
    }
    else if(caption == ""){
alert("Please Enter a caption")
    }
    else {
      setClicked(true);
      upload(file, caption);
    }
  }
  function showPreview(event) {
    if (event.target.files.length > 0) {
      setFile(event.target.files[0]);
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
  }
  return (
    <React.Fragment>
      <Header/>
      <div className="row my_row">
        <div className="card center">
          <input
            type="file"
            id="file-ip-1"
            accept="image/*"
            onChange={showPreview}
            style={{ display: "none" }}
          />
          <div className="card-image">
            <label htmlFor="file-ip-1">
              <img id="file-ip-1-preview" className="my_image" />
            </label>
          </div>
          <div class="card-content">
            <div className="input-field ">
              <input
                autoComplete="off"
                id="caption"
                type="text"
                className="validate"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <label htmlFor="caption">Caption</label>
            </div>
          </div>
          {clicked ? (
            <div class="progress">
              <div class="indeterminate"></div>
            </div>
          ) : (
            <button
              className="waves-effect waves-light btn-large #039be5 light-blue darken-1 post"
              onClick={handleClick}
            >
              New Post
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default New;
