import React from "react";
import cardName from "../../images/preview/card-name.png";

export default function Preview(props) {
  var origin: any = document.getElementById("my-canvas");
  var urlData = origin.toDataURL("image/png; base64");

  return (
    <React.Fragment>
      <div className="modal-title">
        <span className="logo">logoyogo</span>
        <span className="title">미리보기</span>
      </div>
      <div className="preview-scroll">
        <div className="preview-container">
          <span id="WebPage" className="preview-item">
            <img id="web-page1" src={urlData}></img>
          </span>
          <span id="FaceBook" className="preview-item">
            <img id="face-book1" src={urlData}></img>
          </span>
          <span id="Bcard" className="preview-item">
            <img id="b-card1" src={urlData}></img>
            <img id="b-card2" src={urlData}></img>
            <img id="b-name" src={cardName}></img>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}
