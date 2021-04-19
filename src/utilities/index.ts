require("dotenv").config();
const axios = require("axios");

const SCHEME = process.env.REACT_APP_SERVER_SCHEME;
const HOST = process.env.REACT_APP_SERVER_HOST;
const PORT = process.env.REACT_APP_SERVER_PORT;
const URL_SERVER = `${SCHEME}://${HOST}:${PORT}`;
const API_ICON = process.env.REACT_APP_SERVER_API_ICONFINDER;
const API_FONT = process.env.REACT_APP_SERVER_API_GOOGLEFONT;

// --------- 유효성 검사 메서드입니다 --------- //

export const isValidEmail = (str: any) => {
  // ! 이메일 유형에 맞는지
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(str);
};

export const isValidPassword = (str: any) => {
  // ! 비밀번호는 8자 이상, 20자 이하로 작성해야 합니다.
  // ! 비밀번호는 특수문자(공백, 줄바꿈 포함)이 없어야합니다.
  // ! 비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.
  const regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/i;
  return regExp.test(str);
};

/*export const isValidID = (str: any) => {
  // !아이디는 대소문자 구분없이 영문 + 숫자로 작성해야 합니다.
  // ! 아이디는 5자 이상, 15자 이하여야 합니다.
  const regExp = /^[A-za-z0-9]{5,15}/g;
  return regExp.test(str);
};*/

export const Fetch_Icon = {
  searchIcons: (keyword: string): Array<Object> => {
    const count = 60;
    const URL = `/api/v4/icons/search?query=${keyword}&vector=1&count=${count}&premium=0`;
    console.log(URL);

    const result = axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${API_ICON}`,
          // "Content-Type": "application/json",
        },
        // withCredentials: true,
        // crossDomain: true,
      })
      .then((data: any) => {
        console.log(data);
        return data.data.icons;
      })
      .catch((err: any) => console.log(err));

    return result;
  },

  getIcon: (iconId: number): any => {
    const URL = `/api/v4/icons/${iconId}`;

    const result = axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${API_ICON}`,
          // "Content-Type": "application/json",
        },
        // withCredentials: true,
        // crossDomain: true,
      })
      .then((data: any) => {
        return data.data.vector_sizes[0].formats[0].download_url;
      })
      .catch((err: any) => console.log(err));

    return result;
  },

  getImageByUrl: (url: string): any => {
    const cuttedUrl = url.split("https://api.iconfinder.com/v4/icons/")[1];
    const URL = `/api/v4/icons/${cuttedUrl}`;

    const result = axios
      .get(URL, {
        headers: {
          Authorization: `Bearer ${API_ICON}`,
          // "Content-Type": "application/json",
        },
        // withCredentials: true,
        // crossDomain: true,
      })
      .then((data: any) => {
        return data.data;
      })
      .catch((err: any) => console.log(err));

    return result;
  },
};

export const Fetch_Font = {
  getFonts: () => {
    const URL = `https://webfonts.googleapis.com/v1/webfonts?key=${API_FONT}&sort=TRENDING`;

    const result = axios
      .get(URL)
      .then((data: any) => {
        return data.data;
      })
      .catch((err: any) => console.log(err));

    return result;
  },
};
