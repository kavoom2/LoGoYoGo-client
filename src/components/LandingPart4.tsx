export default function LandingPart2() {
  return (
    <div id="Footer">
      <div className="container">
        <div className="title">나만의 멋진로고를 지금 만들어볼까요?</div>
        <div className="subtitle">
          간단한 몇 가지의 질의응답 통해 자신만의 로고를 제작할수 있습니다.
          <br />
          지금 LOGOYOGO와 함께 시작하세요!
        </div>
        <input
          className="input-logoname"
          placeholder="로고를 입력하세요"
        ></input>
        <button>시작하기</button>
      </div>
    </div>
  );
}
