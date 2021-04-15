import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { Fetch_Icon } from "../../utilities/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";
import NoResult from "./NoResult";
import BeforeSearch from "./BeforeSearch";
import ColorPicker from "./ColorPicker";

export default function ClipArt({
  canvas,
  clipItems,
  clipGroup,
  clipColors,
  isLoading,
  setClipItems,
  setIsLoading,
  setClipGroup,
  setClipColors,
}) {
  const [keyword, setKeyword] = useState<string>("");
  const [imgs, setImgs] = useState<Array<any>>([]);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [islistLoaded, setIsListLoaded] = useState<boolean>(true);

  useEffect(() => {
    setImgs(clipItems);

    return () => {};
  }, [clipItems]);

  useEffect(() => {
    const colorFilters = {};
    for (let i = 0; i < clipGroup.length; i++) {
      const item = clipGroup[i];
      const color = item.fill;
      if (!colorFilters[color]) {
        colorFilters[color] = [i];
      } else {
        colorFilters[color] = [...colorFilters[color], i];
      }
    }

    const keys = Object.keys(colorFilters);
    const colorStates = {};
    for (let i = 0; i < keys.length; i++) {
      colorStates[keys[i]] = keys[i];
    }
    setClipColors(colorStates);
  }, [clipGroup]);

  useEffect(() => {}, [clipColors]);

  const handleOnChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = async () => {
    // * 1. 검색 결과를 불러옵니다.
    setIsFirst(false);
    setIsListLoaded(false);
    const items = await Fetch_Icon.searchIcons(keyword);

    // * 2. 각 검색결과에 대하여 썸네일을 불러옵니다.
    const promises = items.map(async (item: any) => {
      return {
        id: item.icon_id,
        img: item.raster_sizes[6].formats[0].preview_url,
      };
    });

    const thumbnails = await Promise.all(promises);
    setClipItems(thumbnails);

    setIsListLoaded(true);
  };

  const handleAddClipArt = async (id: number) => {
    setIsLoading(true);

    const svgUrl = await Fetch_Icon.getIcon(id);
    const svg = await Fetch_Icon.getImageByUrl(svgUrl);

    fabric.loadSVGFromString(svg, (objects, options) => {
      const groupObj: any = new fabric.Group(objects, {});

      groupObj.set({
        // * : 오브젝트 타입과 키값을 명시합니다.
        customType: "clipArt",
        // ! 하위 오브젝트들이 선택될 수 있도록 합니다. (대상이 너무 많으므로 임시로 해제)
        // subTargetCheck: true,
      });

      groupObj.set({
        scaleX: canvas.width / groupObj.get("width") / 3,
        scaleY: canvas.width / groupObj.get("width") / 3,
        customType: "clipArt",
      });

      groupObj.set({
        left:
          canvas.width / 2 -
          (groupObj.get("width") * groupObj.get("scaleX")) / 2,
        top:
          canvas.height / 2 -
          (groupObj.get("height") * groupObj.get("scaleY")) / 2,
      });

      canvas.setActiveObject(groupObj);
      canvas.add(groupObj);
      setIsLoading(true);
    });
  };

  const handleChangeColor = (color, indexs, keyName) => {
    for (let i = 0; i < clipGroup.length; i++) {
      if (!indexs.includes(i)) continue;
      const item = clipGroup[i];
      item.set({ fill: color.hex });
    }

    setClipColors({
      ...clipColors,
      keyName: color,
    });

    canvas.renderAll();
  };

  const renderImgs = () => {
    const result = imgs.map((el, idx) => {
      return (
        <div
          className="img-container"
          key={idx}
          onClick={() => {
            handleAddClipArt(el.id);
          }}
        >
          <img key={idx} src={el.img} />
        </div>
      );
    });
    if (result.length === 0) {
      if (isFirst) {
        return <BeforeSearch />;
      } else {
        return <NoResult />;
      }
    }
    return result;
  };

  const renderColors = () => {
    const colorFilters = {};
    for (let i = 0; i < clipGroup.length; i++) {
      const item = clipGroup[i];
      const color = item.fill;
      if (!colorFilters[color]) {
        colorFilters[color] = [i];
      } else {
        colorFilters[color] = [...colorFilters[color], i];
      }
    }

    const keys = Object.keys(colorFilters);

    const result = [];
    for (let i = 0; i < keys.length; i++) {
      const indexs = colorFilters[keys[i]];
      const itemIndex = colorFilters[keys[i]][0];
      const item = clipGroup[itemIndex];
      const keyName = keys[i];
      result.push(
        <ColorPicker
          key={i}
          id={i}
          color={item.fill}
          handleChangeColor={(color) => {
            handleChangeColor(color, indexs, keyName);
          }}
        />
      );
    }

    return result;
  };

  return (
    <React.Fragment>
      <div className="header">
        <div className="title">클립아트</div>
        <div className="description">원하는 클립아트를 선택하세요.</div>
      </div>

      {clipGroup.length > 0 ? (
        <div className="content">
          <div className="title">색상 테이블</div>
          <div className="clipart-colors">{renderColors()}</div>
        </div>
      ) : (
        ""
      )}

      <div className="content">
        <div className="title">키워드 검색</div>
        <div className="clipart-search">
          <input
            onChange={handleOnChange}
            placeholder="Apple, Cafe, Mouse....."
          />
          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <div className="content">
        <div className="clipart-container">
          {!islistLoaded ? <Loading /> : renderImgs()}
        </div>
      </div>
    </React.Fragment>
  );
}
