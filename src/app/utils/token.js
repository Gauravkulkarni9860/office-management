export const setToken = (value) => {
  localStorage.setItem("token", JSON.stringify(value));
};

export const removeItem = (key) => {
  localStorage.removeItem("token");
};
