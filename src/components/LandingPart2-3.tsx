import imgPath from "../images/main/landing2-3.png";

export default function LandingPart2() {
  return (
    <div id="section2">
      <div className="container">
        <div className="label">
          <span>스마트폰으로 하고 싶어요.</span>
        </div>
        <div className="title">모바일 환경에서도 이용할 수 있습니다.</div>
        <div className="subtitle">
          데스크탑, 테블릿, 모바일 환경을 모두 지원합니다. 내가 원하는 기기로
          언제 어디서나 쉽고 간편하게 로고를 만들어보세요.
        </div>
      </div>
      <div className="container3">
        <img src={imgPath} />
      </div>
    </div>
  );
}
