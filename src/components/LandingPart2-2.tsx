import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFont,
  faSquare,
  faPalette,
  faImage,
  faTint,
} from "@fortawesome/free-solid-svg-icons";
import img_cp from "../images/main/landing-2-2-CP.png";
import img_tx from "../images/main/landing-2-2-TX.png";
import img_sp from "../images/main/landing-2-2-SP.png";
import img_ca from "../images/main/landing-2-2-CA.png";
import img_bg from "../images/main/landing-2-2-BG.png";
import vid_mp4 from "../images/main/landing-2-2.mp4";

export default function LandingPart3() {
  const [index, setIndex] = useState<number>(3);
  const [textIdx, setTextIdx] = useState<number>(3);
  const [fadeIn, setFadeIn] = useState<boolean>(true);
  const images = [img_cp, img_tx, img_sp, img_ca, img_bg];
  const titles = ["컬러 팔레트", "텍스트", "도형", "클립아트", "배경"];
  const messages = [
    "어떤 색을 써야할지 잘 모르겠다면, 원하는 색상 테이블만 선택해주세요. 배경, 텍스트, 도형의 색상을 바꾸어줍니다.",
    "50여개 이상의 다양한 폰트로 나만의 로고를 만들어보세요. 크기와 색상 등을 자유롭게 변경할 수 있습니다.",
    "30여개 이상의 도형으로 나만의 로고를 만들 수 있습니다. 크기와 색상을 자유롭게 변경할 수 있습니다.",
    "다양한 클립아트를 이용해보세요. 클립아트를 내가 원하는 크기와 색상으로 자유롭게 변경할 수 있습니다",
    "로고와 어울리는 배경 색상을 선택하세요. 쉽고 간편하게 변경할 수 있습니다.",
  ];

  useEffect(() => {
    const imageList = [img_cp, img_tx, img_sp, img_ca, img_bg, vid_mp4];
    imageList.forEach((item) => {
      new Image().src = item;
    });
  }, []);

  useEffect(() => {}, [index]);

  const handleSetIndex = (idx) => {
    if (index === idx) return;
    setFadeIn(false);
    setTextIdx(idx);
    setTimeout(() => {
      setFadeIn(true);
      setIndex(idx);
    }, 200);
  };

  return (
    <div id="section3">
      <div id="section-sub-1">
        <div className="container2">
          <video autoPlay loop muted>
            <source src={vid_mp4} type="video/mp4" />
          </video>
        </div>
        <div className="container">
          <div className="label">
            <span>더 꾸미고 싶어요.</span>
          </div>
          <div className="title">
            쉽고 다양한 커스터마이징 기능을 사용해보세요.
          </div>
          <div className="subtitle">
            에디터에서 로고의{" "}
            <b
              className={textIdx === 0 ? "target" : ""}
              onClick={() => {
                handleSetIndex(0);
              }}
            >
              팔레트
            </b>
            ,{" "}
            <b
              className={textIdx === 1 ? "target" : ""}
              onClick={() => {
                handleSetIndex(1);
              }}
            >
              텍스트
            </b>
            ,{" "}
            <b
              className={textIdx === 2 ? "target" : ""}
              onClick={() => {
                handleSetIndex(2);
              }}
            >
              도형
            </b>
            ,{" "}
            <b
              className={textIdx === 3 ? "target" : ""}
              onClick={() => {
                handleSetIndex(3);
              }}
            >
              클립아트
            </b>
            ,{" "}
            <b
              className={textIdx === 4 ? "target" : ""}
              onClick={() => {
                handleSetIndex(4);
              }}
            >
              배경
            </b>{" "}
            등을 자유롭게 변경할 수 있습니다. 이 기능을 활용해서 정체성을 잘
            담아낸 자신만의 로고를 만들어보세요.
          </div>
        </div>
      </div>
      <div id="section-sub-2">
        <div className="container3">
          <div className="tab">미리보기</div>

          <div className="funcs">
            <div className="text-container">
              <div className={fadeIn ? "title active" : "title"}>
                {titles[index]}
              </div>
              <div className={fadeIn ? "subtitle active" : "subtitle"}>
                {messages[index]}
              </div>
            </div>
            <div className="btn-container">
              <button
                className={textIdx === 0 ? "target" : ""}
                onClick={() => {
                  handleSetIndex(0);
                }}
              >
                <FontAwesomeIcon icon={faTint} />
                <br />
                팔레트
              </button>
              <button
                className={textIdx === 1 ? "target" : ""}
                onClick={() => {
                  handleSetIndex(1);
                }}
              >
                <FontAwesomeIcon icon={faFont} />
                <br />
                텍스트
              </button>
              <button
                className={textIdx === 2 ? "target" : ""}
                onClick={() => {
                  handleSetIndex(2);
                }}
              >
                <FontAwesomeIcon icon={faSquare} />
                <br />
                도형
              </button>
              <button
                className={textIdx === 3 ? "target" : ""}
                onClick={() => {
                  handleSetIndex(3);
                }}
              >
                <FontAwesomeIcon icon={faPalette} />
                <br />
                클립아트
              </button>
              <button
                className={textIdx === 4 ? "target" : ""}
                onClick={() => {
                  handleSetIndex(4);
                }}
              >
                <FontAwesomeIcon icon={faImage} />
                <br />
                배경
              </button>
            </div>
          </div>

          <div className={fadeIn ? "img-container view" : "img-container"}>
            <img src={images[index]} />
          </div>
        </div>
      </div>
    </div>
  );
}
