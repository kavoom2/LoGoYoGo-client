import React from "react";

export default function Layout() {
  return (
    <React.Fragment>
      <div className="header">
        <div className="title">배치</div>
        <div className="description">각 요소의 배치를 설정할 수 있습니다.</div>
      </div>

      <div className="content">
        <div className="title">배치</div>
        <div className="layout-container">
          <button>배치 1</button>
          <button>배치 2</button>
          <button>배치 2</button>
          <button>배치 4</button>
        </div>
      </div>
    </React.Fragment>
  );
}
