import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Preview(props) {
  var origin: any = document.getElementById("my-canvas");
  var urlData = origin.toDataURL("image/png; base64");
  var copy = document.getElementById("copy");
  console.log(urlData);

  return (
    <React.Fragment>
      <div className="preview-container">
        <span id="WebPage" className="preview-item">
          <img id="wpage1" src={urlData}></img>
        </span>
        <span id="FaceBook" className="preview-item">
          <img id="fbook1" src={urlData}></img>
        </span>
        <span id="Bcard" className="preview-item">
          <img id="bCard1" src={urlData}></img>
          <img id="bCard2" src={urlData}></img>
        </span>
      </div>
    </React.Fragment>
  );
}
