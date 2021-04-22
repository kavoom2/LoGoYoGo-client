import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { Actions } from "../actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlusSquare } from "@fortawesome/free-brands-svg-icons";
import { useHistory } from "react-router-dom";

require("dotenv").config();

const clientId: string = process.env.REACT_APP_SERVER_GOOGLEOAUTH;

export default function GoogleButton({ onSocial }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSuccess = async (res) => {
    const {
      googleId,
      profileObj: { email, name },
    } = res;

    const username = res.gt.Te;
    const googleemail = res.gt.Rt;
    const json = { username: username, email: googleemail };
    dispatch(Actions.setUserInfo(username, googleemail));
    sessionStorage.setItem("userinfo", JSON.stringify(json));
    window.location.reload();
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div className="btn-login">
      <GoogleLogin
        clientId={clientId}
        responseType={"id_token"}
        render={(props) => (
          <button onClick={props.onClick} disabled={props.disabled}>
            <FontAwesomeIcon icon={faGooglePlusSquare} />
          </button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}
