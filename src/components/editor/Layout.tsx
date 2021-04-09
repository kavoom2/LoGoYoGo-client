import React from "react";
import { fabric } from "fabric";

export default function Layout({ canvas, setIndex }) {
  const handleTempEvent = () => {
    const rect = new fabric.Rect({
      width: 50,
      height: 50,
      fill: "blue",
      angle: 10,
      top: 20,
      left: 20,
      rx: 5,
      ry: 5,
    });

    console.log(canvas);
    canvas.add(rect);
  };
  return (
    <React.Fragment>
      <div className="header">
        <div className="title">배치</div>
        <div className="description">각 요소의 배치를 설정할 수 있습니다.</div>
      </div>

      <div className="content">
        <div className="title">배치</div>
        <div className="layout-container">
          <button onClick={handleTempEvent}>배치 1</button>
          <button>배치 2</button>
          <button>배치 2</button>
          <button>배치 4</button>
        </div>
      </div>
    </React.Fragment>
  );
}
