import React, { useEffect } from "react";
import { fabric } from "fabric";
import { useHistory } from "react-router-dom";

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
        backgroundColor: "yellow",
      });

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
  });

  const edit = () => {
    const json = sessionStorage.getItem("preset");
    sessionStorage.setItem("sample", json);
    history.push("/maker/editor");
  };

  return (
    <div>
      {sessionStorage.getItem("preset") ? (
        <div className="mylogo" onClick={() => edit()}>
          <canvas id="mylogo" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}