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
