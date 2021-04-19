import { useHistory } from "react-router-dom";
import creator from "../dummy/creator";

export default function LandingPart4({ handleLogoName }) {
  const history = useHistory();

  const logoname = (): void => {
    if (sessionStorage.getItem("logo")) {
      creator[0].objects[0].text = sessionStorage.getItem("logo");
      const selectsample = creator[0];
      sessionStorage.setItem("sample", JSON.stringify(selectsample));
      sessionStorage.removeItem("logo");
      history.push("/maker/editor");
    } else {
      sessionStorage.removeItem("logo");
      history.push("/maker/editor");
    }
  };

  const enter = (e): void => {
    if (e.key === "Enter") {
      logoname();
    }
  };

  return (
    <div id="Footer">
      <div className="container">
        <div className="title">나만의 멋진 로고를 지금 만들어볼까요?</div>
        <div className="subtitle">
          간단한 몇 가지의 질의응답 통해 자신만의 로고를 제작할수 있습니다.
          <br />
          지금 LOGOYOGO와 함께 시작하세요!
        </div>
        <input
          onChange={handleLogoName}
          className="input-logoname"
          placeholder="로고를 입력하세요"
          onKeyPress={enter}
        ></input>
        <button onClick={logoname}>시작하기</button>
      </div>
    </div>
  );
}
