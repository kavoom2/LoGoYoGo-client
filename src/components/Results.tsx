export default function Results() {
  return (
    <div id="section">
      <div className="container">
        <div className="title">
          로고는 어디서?
          <br />
          LOGOYOGO에서
        </div>
        <div className="subtitle">
          과제, 프로젝트에 쓸 로고가 필요한가요?
          <br />
          누구나 3분이면 간단히 만들 수 있습니다.
          <br />
          지금 바로 시작하세요.
        </div>
        <input
          className="input-logoname"
          placeholder="로고를 입력하세요"
        ></input>
        <button className="btn-logoname-confirm">시작하기</button>
        <button className="btn-search-template">로고 템플릿 둘러보기</button>
      </div>
      <div className="container">랜딩페이지 이미지</div>
    </div>
  );
}
