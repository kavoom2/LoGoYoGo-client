import React, { useEffect } from "react";
import { fabric } from "fabric";
import { useHistory } from "react-router-dom";
import Invisible from "../images/test/투명레이어.png";
import addLogoIcon from "../images/test/addLogo3.png";

export default function Mylogo() {
  const history = useHistory();

  useEffect(() => {
    if (sessionStorage.getItem("preset")) {
      const canvasWidth = 700;
      const canvasHeight = 600;

      const stageWidth = document.body.clientWidth;
      const stageHeight = document.body.clientHeight;

      const c = new fabric.Canvas("mylogo", {
        preserveObjectStacking: true,
        stopContextMenu: true,
        fireRightClick: true,
        height: canvasHeight,
        width: canvasWidth,
        backgroundColor: "white",
      });

      const initRatio = 0.7;

      c.setDimensions({
        width: canvasWidth * initRatio,
        height: canvasHeight * initRatio,
      });

      c.setZoom(initRatio);

      if (stageWidth <= 768) {
        const scaleRatio = (stageHeight * 0.4) / canvasHeight;

        if (canvasWidth * scaleRatio <= 0.95 * stageWidth) {
          c.setDimensions({
            width: canvasWidth * scaleRatio,
            height: canvasHeight * scaleRatio,
          });

          c.setZoom(scaleRatio);
        } else {
          c.setDimensions({
            width: stageWidth * 0.95,
            height: (canvasHeight * (stageWidth * 0.95)) / canvasWidth,
          });

          c.setZoom((stageWidth * 0.95) / canvasWidth);
        }
      }

      const json = sessionStorage.getItem("preset");
      c.clear();
      c.loadFromJSON(json, c.renderAll.bind(c));
    }
  }, []);

  const edit = () => {
    const json = sessionStorage.getItem("preset");
    sessionStorage.setItem("sample", json);
    history.push("/maker/editor");
  };

  const goedit = () => {
    const json = sessionStorage.getItem("preset");
    if (json) {
      sessionStorage.setItem("sample", json);
      history.push("/maker/editor");
    } else {
      history.push("/maker/editor");
    }
  };

  const addLogoHandle = (): void => {
    history.push("/maker/selectshape");
  };

  return (
    <div>
      {sessionStorage.getItem("preset") ? (
        <div>
          <div className="mylogo-title">
            <span className="mylogo-title-text">내 최근 로고</span>
          </div>
          <div className="mylogo" onClick={edit}>
            <img
              className="mylogo-outer"
              src={Invisible}
              style={{ zIndex: 1, position: "absolute" }}
            ></img>
            <canvas id="mylogo" />
          </div>
          <div className="mylogo-addlogo" onClick={addLogoHandle}>
            Add More LOGO
            <br></br>
            <img className="icon" src={addLogoIcon}></img>
          </div>
        </div>
      ) : (
        <div>
          <div className="mylogo-addlogo-b" onClick={addLogoHandle}>
            Add More LOGO
            <br></br>
            <img className="icon" src={addLogoIcon}></img>
          </div>
        </div>
      )}
    </div>
  );
}
