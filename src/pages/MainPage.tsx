import Nav from "../components/Nav";
import LandingPart1 from "../components/LandingPart1";
import "../scss/MainPage.scss";
import "../scss/_CommonComponents.scss";

export default function MainPage() {
  return (
    <div id="container-mainpage">
      <Nav />
      <LandingPart1 />
    </div>
  );
}
