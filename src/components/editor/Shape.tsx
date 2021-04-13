import React from "react";
import { ChromePicker } from "react-color";
import { fabric } from "fabric";
const reqSvgs = require.context("../../images", true, /\.svg$/);
const paths = reqSvgs.keys();
const svgs = paths.map((path) => reqSvgs(path).default);

export default function Shape({
  canvas,
  shapeSize,
  shapeColor,
  setShapeSize,
  setShapeColor,
  setIndex,
}) {
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
        <div className="title">모양</div>
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
        <div className="color-selector-container">
          <input></input>
          <div
            className="color-selector-color"
            style={{ backgroundColor: shapeColor }}
          ></div>
        </div>
        <ChromePicker
          className="color-selector-picker"
          color={shapeColor}
          onChange={handleChangeColor}
          disableAlpha={true}
        />
      </div>
    </React.Fragment>
  );
}

// ! 삭제한 기존의 HandleAddShape 메서드입니다
// const handleAddShape = (type: string) => {
//   let shape: any;
//   if (type === "Rect") {
//     shape = new fabric.Rect({
//       fill: shapeColor,
//       width: shapeSize,
//       height: shapeSize,
//       scaleX: 1,
//       scaleY: 1,
//       left: canvas.width / 2 - shapeSize / 2,
//       top: canvas.height / 2 - shapeSize / 2,
//     });

//     shape.set({
//       // * : 오브젝트 타입과 키값을 명시합니다.
//       customType: "shape",
//       id: id,
//     });

//     // TODO: Event - Selected
//     shape.on("selected", (event) => {
//       setShapeSize(parseInt(shape.width));
//       setShapeColor(shape.fill);
//       setIndex(2);

//       const slider: any = document.getElementById("slider-shape");
//       if (!slider) return;
//       slider.value = String(shape.width);
//     });
//   } else if (type === "Circle") {
//     shape = new fabric.Ellipse({
//       fill: shapeColor,
//       rx: shapeSize / 2,
//       ry: shapeSize / 2,
//       scaleX: 1,
//       scaleY: 1,
//       left: canvas.width / 2 - shapeSize / 2,
//       top: canvas.height / 2 - shapeSize / 2,
//     });

//     shape.set({
//       // * : 오브젝트 타입과 키값을 명시합니다.
//       customType: "circle",
//       id: id,
//     });

//     // TODO: Event - Selected
//     shape.on("selected", (event) => {
//       setShapeSize(Math.round(shape.rx * shape.scaleX * 2));
//       setShapeColor(shape.fill);
//       setIndex(2);

//       console.log(shape);

//       const slider: any = document.getElementById("slider-shape");
//       if (!slider) return;
//       slider.value = String(Math.round(shape.rx * shape.scaleX * 2));
//     });
//   } else return;

//   setId(id + 1);

//   canvas.add(shape);
//   canvas.setActiveObject(shape);
// };
