import { useHistory } from "react-router-dom";
import creator from "../dummy/creator";
import imgPath from "../images/main/landing1.png";

export default function LandingPart1({ handleLogoName }) {
  const history = useHistory();

  const logoname = (): void => {
    if (sessionStorage.getItem("logo")) {
      creator[0].objects[1].text = sessionStorage.getItem("logo");
      sessionStorage.removeItem("logo");
      history.push("/maker/selectshape");
    } else {
      sessionStorage.removeItem("logo");
      creator[0].objects[1].text = "sample";
      history.push("/maker/selectshape");
    }
  };

  const enter = (e): void => {
    if (e.key === "Enter") {
      logoname();
    }
  };

  return (
    <div id="section1">
      <div className="container">
        <div className="title">
          LOGO는 어디서?
          <br />
          LOGOYOGO에서!
        </div>
        <div className="subtitle">
          과제, 프로젝트에 쓸 로고가 필요한가요? 누구나 3분이면 간단히 만들 수
          있습니다. 아래 로고를 입력하고 지금 바로 시작해보세요.
        </div>
        <div className="landing1-button-container">
          <input
            className="input-logoname"
            placeholder="로고를 입력하세요"
            onChange={handleLogoName}
            onKeyPress={enter}
          ></input>
          <button className="btn-logoname-confirm" onClick={logoname}>
            시작하기
          </button>
        </div>
        <button
          className="btn-search-template"
          onClick={() => history.push("/maker")}
        >
          다른 사용자의 템플릿 둘러보기
        </button>
      </div>
      <div className="container2">
        <img src={imgPath} />
      </div>
      <div className="container3"></div>
      <div className="container4"></div>
    </div>
  );
}
