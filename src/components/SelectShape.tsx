import React from "react";
import { useHistory } from "react-router-dom";
import creator from "../dummy/creator";
import { fabric } from "fabric";

const reqSvgs = require.context("../images", true, /\.svg$/);
const paths = reqSvgs.keys();
const svgs = paths.map((path) => reqSvgs(path).default);

export default function selectShape() {
  const history = useHistory();

  const handleIndex = (idx: number): void => {
    const svgPath = svgs[idx];

    fabric.loadSVGFromURL(svgPath, (objects, options) => {
      objects.forEach((object: any, idx: number) => {
        object.set({
          customType: "shape",
        });

        object.set({
          scaleX: 100 / object.width,
          scaleY: 100 / object.width,
        });

        object.set({
          left: 200 - (object.width / 2) * object.scaleX,
          top: 280 - (object.height / 2) * object.scaleY,
        });

        creator[0].objects[0] = object;
      });
    });
    history.push("/maker/selectcolor");
  };

  const renderItems = (): Array<JSX.Element> => {
    const result: Array<JSX.Element> = svgs.map((svgPath, idx) => {
      if (idx > 53) return;
      return (
        <div className="item-shape" key={idx}>
          <img
            src={svgPath}
            style={{ fill: "#333135" }}
            onClick={() => {
              handleIndex(idx);
            }}
          />
        </div>
      );
    });

    // result.reverse();
    return result;
  };

  return (
    <React.Fragment>
      <div id="section-creator">
        <div className="body-header">
          <div className="title">도형을 선택하세요.</div>
          <div className="subtitle">
            로고에 사용할 도형을 선택합니다. 선택한 도형은 에디터에서 수정할 수
            있습니다.
          </div>
        </div>
        <div className="body-item-outer-container">
          <div className="body-item-container">{renderItems()}</div>
        </div>
      </div>
      <div id="footer-creator">
        <button
          className="item-sample"
          onClick={() => history.push("/maker/editor")}
        >
          빈 캔버스에서 직접 로고 만들기
        </button>
      </div>
    </React.Fragment>
  );
}
