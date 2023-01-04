export const getLocalRefreshToken = () => {
  return JSON.parse(localStorage.getItem('tokens'))?.refresh?.token;
};

export const getLocalAccessToken = () => {
  return JSON.parse(localStorage.getItem('tokens'))?.access?.token;
};

export const setTokens = (tokens) => {
  localStorage.setItem('tokens', JSON.stringify(tokens));
};
