import React, { useState, useEffect } from "react";
import NavEditor from "./editor/NavEditor";
import ColorPalette from "./editor/ColorPalette";
import Text from "./editor/Text";
import Shape from "./editor/Shape";
import Background from "./editor/Background";
import Layout from "./editor/Layout";
import ClipArt from "./editor/ClipArt";
import { fabric } from "fabric";
import "../scss/editor/_CommonComponentsEditor.scss";

// ! Object Controll Container
export default function Editor() {
  // *: Commons
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
  const [shapeType, setShapeType] = useState<any>();
  // *: ClipArts
  const [clipItems, setClipItems] = useState<Array<any>>([]);

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

      c.on("selection:created", function (event: any) {});

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
            } else if (el.type === "shape") {
              el.width *= el.scaleX;
              el.height *= el.scaleY;
              el.cacheWidth = el.width;
              el.cacheHeight = el.height;
              el.scaleX = 1;
              el.scaleY = 1;
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

          const slider: any = document.getElementById("slider-text");

          if (!slider) return;
          slider.value = String(event.target.fontSize);
          setTextSize(event.target.fontSize);
        } else if (event.target.type === "shape") {
          event.target.width *= event.target.scaleX;
          event.target.height *= event.target.scaleY;
          event.target.scaleX = 1;
          event.target.scaleY = 1;
          event.target.dirty = true;

          const slider: any = document.getElementById("slider-shape");

          if (!slider) return;
          slider.value = String(event.target.width);
          setShapeSize(parseInt(event.target.width));
        }
      });
    };

    setCanvasFunc();

    // TODO: 키보드 이벤트를 추가합니다.
    const hamdleEventKeyDown = (event) => {
      // TODO 1. Delete Items
      if (event.keyCode === 46) {
        const items = c.getActiveObjects();
        items.forEach((item) => {
          c.remove(item);
        });
        c.discardActiveObject().renderAll();
      }
    };

    window.addEventListener("keydown", hamdleEventKeyDown);
    return () => {
      c.dispose();
      window.removeEventListener("keydown", hamdleEventKeyDown);
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
      setIndex={setIndex}
    />,
    <Shape
      id={id}
      canvas={canvas}
      shapeSize={shapeSize}
      shapeColor={shapeColor}
      setShapeSize={setShapeSize}
      setShapeColor={setShapeColor}
      setIndex={setIndex}
      setId={setId}
    />,
    <Background canvas={canvas} bgColor={bgColor} setBgColor={setBgColor} />,
    <Layout canvas={canvas} setIndex={setIndex} />,
    <ClipArt
      id={id}
      canvas={canvas}
      clipItems={clipItems}
      setId={setId}
      setClipItems={setClipItems}
    />,
  ];

  const handleIndexNumber = (idx: number): void => {
    setIndex(idx);
  };

  return (
    <div id="section">
      <NavEditor canvas={canvas} />
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
              handleIndexNumber(5);
            }}
          >
            클립아트
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
