import React, { useEffect } from "react";
import Header from '../components/Header'
function Add() {
  
  useEffect(() => {
    var preview = document.getElementById("file-ip-1-preview");
    preview.src =
      "https://res.cloudinary.com/instaclone1812/image/upload/v1600345462/select_pic_kw9gj3.png";
    preview.style.display = "block";
  }, []);
  function showPreview(event) {
    if (event.target.files.length > 0) {
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
              <img
                id="file-ip-1-preview"
                style={{ border: "0.5px solid black" }}
                className="my_image"
              />
            </label>
          </div>
          <div class="card-content">
            <div className="input-field ">
              <input
                autoComplete="off"
                id="caption"
                type="text"
                className="validate"
              />
              <label htmlFor="caption">Caption</label>
            </div>
          </div>

          <button className="waves-effect waves-light btn-large #039be5 light-blue darken-1 post">
           Post
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Add;
