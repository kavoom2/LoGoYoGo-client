import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { Fetch_Icon } from "../../utilities/index";

export default function ClipArt({
  id,
  canvas,
  clipItems,
  setClipItems,
  setId,
}) {
  const [keyword, setKeyword] = useState<string>("");
  const [imgs, setImgs] = useState<Array<any>>([]);

  useEffect(() => {
    setImgs(clipItems);
  }, [clipItems]);

  const handleOnChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = async () => {
    // * 1. 검색 결과를 불러옵니다.
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
  };

  const handleAddClipArt = async (id: number) => {
    const svgUrl = await Fetch_Icon.getIcon(id);
    const svg = await Fetch_Icon.getImageByUrl(svgUrl);

    fabric.loadSVGFromString(svg, (objects, options) => {
      objects.forEach((el: any) => {
        el.set({ customType: "shape" });
      });
      const groupObj: any = new fabric.Group(objects, {});

      groupObj.set({
        // * : 오브젝트 타입과 키값을 명시합니다.
        customType: "clipArt",
        id: id,
        // ! 하위 오브젝트들이 선택될 수 있도록 합니다. (대상이 너무 많으므로 임시로 해제)
        // subTargetCheck: true,
      });

      groupObj.set({
        scaleX: canvas.width / groupObj.get("width") / 3,
        scaleY: canvas.width / groupObj.get("width") / 3,
      });

      groupObj.set({
        left:
          canvas.width / 2 -
          (groupObj.get("width") * groupObj.get("scaleX")) / 2,
        top:
          canvas.height / 2 -
          (groupObj.get("height") * groupObj.get("scaleY")) / 2,
      });

      setId(id + 1);

      canvas.setActiveObject(groupObj);
      canvas.add(groupObj);
    });
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
    return result;
  };

  return (
    <React.Fragment>
      <div className="header">
        <div className="title">클립아트</div>
        <div className="description">
          원하는 클립아트를 생성하세요.
          <br />
          키워드로 검색할 수 있습니다.
        </div>
      </div>

      <div className="content">
        <div className="title">클립아트 검색</div>
        <div className="color-selector-container">
          <input onChange={handleOnChange} />
          <button onClick={handleSearch}>검색</button>
        </div>
      </div>

      <div className="content">
        <div className="clipart-container">{renderImgs()}</div>
      </div>
    </React.Fragment>
  );
}
