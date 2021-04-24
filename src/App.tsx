import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useEffect } from "react";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/MainPage";
import Maker from "./pages/Maker";
import Profile from "./pages/Profile";
import Modal from "./pages/Modal";
import "./css/App.css";
import "./scss/ErrorPage.scss";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";
import { Fetch_Font } from "./utilities/index";
import WebFont from "webfontloader";

function App() {
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);

  useEffect(() => {
    async function asyncPreloadFonts() {
      const result = await Fetch_Font.getFonts();

      const krItems = result.items.filter((el) => {
        if (el.subsets.includes("korean")) return true;
        else return false;
      });

      const enItems = [];

      for (let i = 0; i < 50; i++) {
        const el = result.items[i];
        if (!el.subsets.includes("korean") && el.subsets.includes("latin"))
          enItems.push(el);
      }

      const krFontItems: Array<string> = krItems.map((item: any) => {
        return item.family;
      });
      const enFontItems: Array<string> = enItems.map((item: any) => {
        return item.family;
      });

      WebFont.load({
        google: { families: enFontItems },
      });

      WebFont.load({
        google: { families: krFontItems },
      });

      krFontItems.forEach((item) => {
        const preloadEl = document.getElementById("font-preload");
        const itemEl = document.createElement("div");
        itemEl.textContent =
          "ㄱㄲㄴㄵㄶㄷㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅢㅔㅖㅐㅒ가나다라마바사자차카타파하아야어여오요우유으이의위외왜위웨에애예얘압앚앋악앗았암안앙알앟앜앝앛앞앆앇않앉";
        itemEl.style.fontFamily = item;

        preloadEl.appendChild(itemEl);
      });
    }
    asyncPreloadFonts();
  }, []);

  return (
    <React.Fragment>
      <Modal />
      <Router>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/profile" component={isLogin ? Profile : NotFound} />
          <Route path="/maker" component={Maker} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
