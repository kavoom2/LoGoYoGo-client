import { useHistory } from "react-router-dom";
import creator from "../dummy/creator";

export default function LandingPart4({ handleLogoName }) {
  const history = useHistory();

  const logoname = (): void => {
    if (sessionStorage.getItem("logo")) {
      creator[0].objects[1].text = sessionStorage.getItem("logo");
      sessionStorage.removeItem("logo");
      creator[0].objects[1].text = "sample";
      history.push("/maker/selectshape");
    } else {
      sessionStorage.removeItem("logo");
      history.push("/maker/selectshape");
    }
  };

  const enter = (e): void => {
    if (e.key === "Enter") {
      logoname();
    }
  };

  const handleOpenGitProfile = (username: string): void => {
    window.open(`https://github.com/${username}`, "_blank");
  };

  return (
    <div id="Footer">
      <div className="container">
        <div className="title">나만의 멋진 로고를 지금 만들어보세요.</div>
        <div className="subtitle">
          간단한 몇 가지의 질의응답 통해 자신만의 로고를 제작할수 있습니다. 지금
          LOGOYOGO와 함께 시작하세요!
        </div>
        <div className="landing4-button-container">
          <input
            className="input-logoname"
            placeholder="로고를 입력하세요"
            onChange={handleLogoName}
            onKeyPress={enter}
          ></input>
          <button onClick={logoname}>시작하기</button>
        </div>
      </div>
      <div className="container2">
        <div className="title">
          <span className="logo">logoyogo</span>
          <span className="content">Copyright © 2021 logoyogo</span>
        </div>
        <div className="crews">
          <div
            onClick={() => {
              handleOpenGitProfile("kavoom2");
            }}
          >
            <img src="https://avatars.githubusercontent.com/u/70474517?v=4" />
            <span>정진규</span>
          </div>
          <div
            onClick={() => {
              handleOpenGitProfile("kjk0507");
            }}
          >
            <img src="https://avatars.githubusercontent.com/u/68223697?v=4" />
            <span>김정규</span>
          </div>
          <div
            onClick={() => {
              handleOpenGitProfile("yhl88");
            }}
          >
            <img src="https://avatars.githubusercontent.com/u/55075025?v=4" />
            <span>이용학</span>
          </div>
          <div
            onClick={() => {
              handleOpenGitProfile("gmlwhd6159");
            }}
          >
            <img src="https://avatars.githubusercontent.com/u/58407182?v=4" />
            <span>김희종</span>
          </div>
        </div>
      </div>
    </div>
  );
}
