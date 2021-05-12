import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const history = useHistory();

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.href.slice(-7) === "profile") {
      history.push("/");
      setTimeout(() => {
        history.push("/profile");
      }, 1);
    }
  }, []);

  return (
    <div id="error-container">
      <div className="title">404</div>
      <div className="content">Page not found</div>
    </div>
  );
}
