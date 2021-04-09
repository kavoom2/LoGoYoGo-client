import React, { useState, useEffect } from "react";
import NavEditor from "./editor/NavEditor";
import ColorPalette from "./editor/ColorPalette";
import Text from "./editor/Text";
import Shape from "./editor/Shape";
import Background from "./editor/Background";
import Layout from "./editor/Layout";
import { fabric } from "fabric";
import "../scss/editor/_CommonComponentsEditor.scss";

export default function Editor() {
  const [id, setId] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [canvas, setCanvas] = useState<any>();
  // *: Text
  const [textSize, setTextSize] = useState<number>(40);
  const [textColor, setTextColor] = useState<string>("Black");
  // *: Bg
  const [bgColor, setBgColor] = useState<string>("Black");
  // *: Shape
  const [shapeSize, setShapeSize] = useState<number>(40);
  const [shapeColor, setShapeColor] = useState<string>("Black");

  useEffect(() => {
    const c = new fabric.Canvas("my-canvas", {
      preserveObjectStacking: true,
      height: 600,
      width: 600,
      backgroundColor: "white",
    });

    // TODO: Canvas Event를 정의합니다.
    const setCanvasFunc = async () => {
      await setCanvas(c);

      c.on("selection:created", function (event: any) {
        if (event.target.type === "textbox") setIndex(1);
      });

      c.on("object:scaling", function (event: any) {});

      c.on("object:modified", function (event: any) {
        // TODO: 1. 텍스트 박스 크기 변경
        if (event.target._objects) {
          // * 1. 1. Grouping일 경우 텍스트상자 크기 변경
          for (let i = 0; i < event.target._objects.length; i++) {
            const el = event.target._objects[i];
            if (el.type === "textbox") {
              el.fontSize *= el.scaleX;
              el.fontSize = el.fontSize.toFixed(0);
              el.scaleX = 1;
              el.scaleY = 1;
              el._clearCache();
            }
          }

          return;
        }

        // * 1. 2. 단일 대상일 경우 텍스트상자 크기 변경
        if (event.target.type === "textbox") {
          event.target.fontSize *= event.target.scaleX;
          event.target.fontSize = event.target.fontSize.toFixed(0);
          event.target.scaleX = 1;
          event.target.scaleY = 1;
          event.target._clearCache();
        }
        setTextSize(event.target.fontSize);
        const slider: any = document.getElementById("slider-text");
        slider.value = String(event.target.fontSize);
      });
    };

    setCanvasFunc();

    return () => {
      c.dispose();
    };
  }, []);

  const components = [
    <ColorPalette canvas={canvas} setIndex={setIndex} />,
    <Text
      id={id}
      canvas={canvas}
      textSize={textSize}
      textColor={textColor}
      setTextSize={setTextSize}
      setTextColor={setTextColor}
      setId={setId}
    />,
    <Shape
      canvas={canvas}
      shapeSize={shapeSize}
      shapeColor={shapeColor}
      setShapeSize={setShapeSize}
      setShapeColor={setShapeColor}
    />,
    <Background canvas={canvas} bgColor={bgColor} setBgColor={setBgColor} />,
    <Layout canvas={canvas} setIndex={setIndex} />,
  ];

  const handleIndexNumber = (idx: number): void => {
    setIndex(idx);
  };

  return (
    <div id="section">
      <NavEditor />
      <div id="container-editor">
        <div className="container-canvas">
          <canvas id="my-canvas" />
        </div>
        <div className="container-tabs">{components[index]}</div>
        <div className="container-tab-buttons">
          <button
            onClick={() => {
              handleIndexNumber(0);
            }}
          >
            팔레트
          </button>
          <button
            onClick={() => {
              handleIndexNumber(1);
            }}
          >
            텍스트
          </button>
          <button
            onClick={() => {
              handleIndexNumber(2);
            }}
          >
            모양
          </button>
          <button
            onClick={() => {
              handleIndexNumber(3);
            }}
          >
            배경
          </button>
          <button
            onClick={() => {
              handleIndexNumber(4);
            }}
          >
            배치
          </button>
        </div>
      </div>
    </div>
  );
}
