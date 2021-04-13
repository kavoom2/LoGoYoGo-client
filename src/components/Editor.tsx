import React, { useState, useEffect } from "react";
import NavEditor from "./editor/NavEditor";
import ColorPalette from "./editor/ColorPalette";
import Text from "./editor/Text";
import Shape from "./editor/Shape";
import Background from "./editor/Background";
import Layout from "./editor/Layout";
import ClipArt from "./editor/ClipArt";
import ContextMenu from "./editor/ContextMenu";
import { fabric } from "fabric";
import "fabric-history";
import "../scss/editor/_CommonComponentsEditor.scss";
import { Fetch_Font } from "../utilities/index";
import { Type } from "typescript";

// ! Object Controll Container
export default function Editor() {
  // *: Commons
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [canvas, setCanvas] = useState<any>();
  // *: Text
  const [textSize, setTextSize] = useState<number>(40);
  const [textColor, setTextColor] = useState<string>("Black");
  const [textAlign, setTextAlign] = useState<string>("left");
  const [fonts, setFonts] = useState<Array<any>>([]);
  const [fontType, setFontType] = useState<string>("");
  const [fontWeight, setFontWeight] = useState(400);
  // *: Bg
  const [bgColor, setBgColor] = useState<string>("white");
  // *: Shape
  const [shapeSize, setShapeSize] = useState<number>(150);
  const [shapeColor, setShapeColor] = useState<string>("Black");
  // *: ClipArts
  const [clipItems, setClipItems] = useState<Array<Type>>([]);
  // *: ContextMenu
  const [visible, setVisible] = useState<boolean>(false);
  const [pointer, setPointer] = useState<any>({ x: null, y: null });

  useEffect(() => {
    // TODO: Get Fonts from API
    async function asyncFunc() {
      const result = await Fetch_Font.getFonts();

      const fontItems = result.items.filter((el) => {
        if (el.subsets.includes("korean")) return true;
        else return false;
      });

      for (let i = 0; i < 50; i++) {
        const el = result.items[i];
        if (!el.subsets.includes("korean") && el.subsets.includes("latin"))
          fontItems.push(el);
      }

      const promises = fontItems.map(async (item: any) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.id = item.family;
        link.type = "text/css";
        link.href = `https://fonts.googleapis.com/css?family=${item.family}`;
        link.media = "all";

        document.head.appendChild(link);
        return item.family;
      });

      const items = await Promise.all(promises);
      setFonts(items);
    }

    asyncFunc();
  }, []);

  useEffect(() => {
    // TODO: Canvas 초기 설정(반응형 포함)
    // Save additional attributes in Serialization
    fabric.Object.prototype.toObject = (function (toObject) {
      return function (propertiesToInclude) {
        propertiesToInclude = (propertiesToInclude || []).concat([
          "customType",
        ]);
        return toObject.apply(this, [propertiesToInclude]);
      };
    })(fabric.Object.prototype.toObject);

    const canvasWidth = 700;
    const canvasHeight = 600;

    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;
    const scaleRatio = (stageHeight * 0.4) / canvasHeight;

    const c = new fabric.Canvas("my-canvas", {
      preserveObjectStacking: true,
      stopContextMenu: true,
      fireRightClick: true,
      height: canvasHeight,
      width: canvasWidth,
      backgroundColor: bgColor,
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

    // TODO: Canvas Event를 정의합니다.
    const setCanvasFunc = async () => {
      await setCanvas(c);

      c.on("object:modified", function (event: any) {
        // TODO: 1. 텍스트 박스 크기 변경
        if (event.target._objects) {
          // * 1. 1. Grouping일 경우 텍스트상자 크기 변경
          for (let i = 0; i < event.target._objects.length; i++) {
            const el = event.target._objects[i];
            if (el.customType === "textbox") {
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
        if (event.target.customType === "textbox") {
          event.target.fontSize *= event.target.scaleX;
          event.target.fontSize = event.target.fontSize.toFixed(0);
          event.target.scaleX = 1;
          event.target.scaleY = 1;
          event.target._clearCache();

          const slider: any = document.getElementById("slider-text");

          if (!slider) return;
          slider.value = String(event.target.fontSize);
          setTextSize(event.target.fontSize);
        } else if (event.target.customType === "shape") {
          const slider: any = document.getElementById("slider-shape");

          if (!slider) return;
          slider.value = String(event.target.width * event.target.scaleX);
          setShapeSize(Math.round(event.target.width * event.target.scaleX));
        }
      });

      c.on("mouse:down", (event) => {
        // TODO: 마우스 우클릭 ContextMenu 이벤트
        if (event.button !== 3) return;
        setVisible(false);
        // TODO: 1. 이미 선택된 오브젝트가 존재할 때,
        let isMouseOver = false;
        const items = c.getActiveObjects();
        c.discardActiveObject();

        const pointer = new fabric.Point(
          c.getPointer(event.e).x,
          c.getPointer(event.e).y
        );

        for (let i = items.length - 1; i >= 0; i--) {
          if (items[i].containsPoint(pointer)) {
            isMouseOver = true;

            items.forEach((el) => {
              c.setActiveObject(el);
            });
            break;
          }
        }

        if (isMouseOver) {
          setPointer({ x: event.e.x, y: event.e.y });
          setVisible(true);
          return;
        }

        c.discardActiveObject();
        const items2 = c.getObjects();

        for (let i = items2.length - 1; i >= 0; i--) {
          if (items2[i].containsPoint(pointer)) {
            c.setActiveObject(items2[i]);
            break;
          }
        }

        c.renderAll();

        // TODO: ContextMenu 이벤트
        if (!(c.getActiveObjects().length > 0)) return;
        setPointer({ x: event.e.x, y: event.e.y });
        setVisible(true);
      });

      c.on("mouse:down", (event) => {
        // ! 그룹 내부 오브젝트들을 수정할 수 있는 이벤트입니다.
        // if (event.subTargets[0]) {
        //   const item = event.subTargets[0];
        //   c.setActiveObject(item);
        // }
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

    // TODO: 반응형 구현을 위한 캔버스 Resize Event
    const handleResizeEvent = () => {
      const stageWidth = document.body.clientWidth;
      const stageHeight = document.body.clientHeight;

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

        c.renderAll();
      } else {
        c.setDimensions({
          width: canvasWidth,
          height: canvasHeight,
        });

        c.setZoom(1);
        c.renderAll();
      }
    };

    window.addEventListener("keydown", hamdleEventKeyDown);
    window.addEventListener("resize", handleResizeEvent, false);

    return () => {
      // TODO: CleanUp 함수입니다.
      c.dispose();
      window.removeEventListener("keydown", hamdleEventKeyDown);
      window.removeEventListener("resize", handleResizeEvent);
    };
  }, []);

  const components = [
    <ColorPalette canvas={canvas} />,
    <Text
      canvas={canvas}
      textSize={textSize}
      textColor={textColor}
      fonts={fonts}
      fontType={fontType}
      fontWeight={fontWeight}
      setTextSize={setTextSize}
      setTextColor={setTextColor}
      setTextAlign={setTextAlign}
      setIndex={setIndex}
      setFontType={setFontType}
      setFontWeight={setFontWeight}
    />,
    <Shape
      canvas={canvas}
      shapeSize={shapeSize}
      shapeColor={shapeColor}
      setShapeSize={setShapeSize}
      setShapeColor={setShapeColor}
      setIndex={setIndex}
    />,
    <Background canvas={canvas} bgColor={bgColor} setBgColor={setBgColor} />,
    <Layout canvas={canvas} setIndex={setIndex} />,
    <ClipArt
      canvas={canvas}
      clipItems={clipItems}
      isLoading={isLoading}
      setClipItems={setClipItems}
      setIsLoading={setIsLoading}
    />,
  ];

  const handleIndexNumber = (idx: number): void => {
    setIndex(idx);
  };

  return (
    <div id="section">
      <NavEditor canvas={canvas} />
      {visible ? (
        <ContextMenu
          canvas={canvas}
          visible={visible}
          pointer={pointer}
          setVisible={setVisible}
        />
      ) : (
        ""
      )}
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
