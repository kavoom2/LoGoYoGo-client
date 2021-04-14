import React, { useEffect } from "react";
import { fabric } from "fabric";
const reqSvgs = require.context("../../images", true, /\.svg$/);
const paths = reqSvgs.keys();
const svgs = paths.map((path) => reqSvgs(path).default);
import ColorPicker from "./ColorPicker";

export default function Shape({
  canvas,
  shapeSize,
  shapeColor,
  setShapeSize,
  setShapeColor,
  setIndex,
}) {
  useEffect(() => {
    // TODO: 슬라이더 Rerender 바 색상 렌더
    const slider = document.getElementById("slider-shape");
    const value = ((shapeSize - 1) / (800 - 1)) * 100;
    slider.style.background =
      "linear-gradient(to right, #859ffd 0%, #859ffd " +
      value +
      "%, #efefef " +
      value +
      "%, #efefef 100%)";

    // TODO: 슬라이더 Value 변경시 바 색상 렌더
    document.getElementById("slider-shape").oninput = function (this: any) {
      var value = ((this.value - this.min) / (this.max - this.min)) * 100;
      this.style.background =
        "linear-gradient(to right, #859ffd 0%, #859ffd " +
        value +
        "%, #efefef " +
        value +
        "%, #efefef 100%)";
    };
  }, []);

  const handleChangeColor = (color, event) => {
    const items = canvas.getActiveObjects();
    items.forEach((item) => {
      if (item.customType === "shape") {
        item.set({ fill: color.hex });
      }
    });

    canvas.renderAll();
    setShapeColor(color.hex);
  };

  const handleChangeSize = (event) => {
    setShapeSize(Number(event.target.value));
    const items = canvas.getActiveObjects();

    items.forEach((item) => {
      if (item.customType === "shape") {
        item.scaleToWidth(Number(event.target.value));
      }
    });

    canvas.requestRenderAll();
  };

  const handleAddShape = (id: number) => {
    const svgPath = svgs[id];

    fabric.loadSVGFromURL(svgPath, (objects, options) => {
      objects.forEach((object: any) => {
        console.log(object);
        object.set({
          customType: "shape",
          fill: shapeColor,
        });

        object.set({
          scaleX: shapeSize / object.get("width"),
          scaleY: shapeSize / object.get("width"),
        });

        object.set({
          left:
            canvas.width / 2 - (object.get("width") * object.get("scaleX")) / 2,
          top:
            canvas.height / 2 -
            (object.get("height") * object.get("scaleY")) / 2,
        });

        object.on("selected", (event) => {
          setShapeSize(Math.round(object.width * object.scaleX));
          setShapeColor(object.fill);
          setIndex(2);

          const slider: any = document.getElementById("slider-shape");
          if (!slider) return;
          slider.value = String(Math.round(object.width * object.scaleX));

          const value =
            (Math.round(object.width * object.scaleX) / (800 - 1)) * 100;
          slider.style.background =
            "linear-gradient(to right, #859ffd 0%, #859ffd " +
            value +
            "%, #efefef " +
            value +
            "%, #efefef 100%)";
        });

        canvas.setActiveObject(object);
        canvas.add(object);
        canvas.renderAll();
      });
    });
  };

  const renderImgs = () => {
    const result = svgs.map((el, idx) => {
      return (
        <div
          className="img-container"
          key={idx}
          onClick={() => {
            handleAddShape(idx);
          }}
        >
          <img src={el} />
        </div>
      );
    });

    return result;
  };

  return (
    <React.Fragment>
      <div className="header">
        <div className="title">도형</div>
        <div className="description">
          원하는 도형을 선택하세요.
          <br />
          크기와 색상를 변경할 수 있습니다.
        </div>
      </div>

      <div className="content">
        <div className="title">모양</div>
        <div className="shape-container">{renderImgs()}</div>
      </div>

      <div className="content">
        <div className="title">크기</div>
        <div className="slider-container">
          <input
            type="range"
            min="1"
            max="800"
            id="slider-shape"
            className="slider"
            onChange={handleChangeSize}
            defaultValue={shapeSize}
          ></input>
          <span>{shapeSize}</span>
        </div>
      </div>

      <div className="content">
        <div className="title">색상</div>
        <ColorPicker color={shapeColor} handleChangeColor={handleChangeColor} />
      </div>
    </React.Fragment>
  );
}
