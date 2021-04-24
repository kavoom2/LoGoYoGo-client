import img_gif from "../images/main/landing-2-1-GIF.gif";

export default function LandingPart2() {
  return (
    <div id="section2">
      <div className="container">
        <div className="label">
          <span>어떻게 사용하나요?</span>
        </div>
        <div className="title">원하는 스타일만 선택하세요.</div>
        <div className="subtitle">
          원하는 로고 이름을 입력하고, 도형과 색상, 위치를 정하시면 맞춤형 로고
          디자인이 완성됩니다.
          <br />더 개성있는 로고로 만들고 싶다면, 에디터의 커스터마이징 기능을
          사용해보세요.
        </div>
      </div>
      <div className="container2">
        <img src={img_gif} />
      </div>
    </div>
  );
}
