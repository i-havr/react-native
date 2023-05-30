const LIMIT = 30;

export const updateString = (str) => {
  if (str.length <= LIMIT) {
    return str;
  } else {
    const updatedString = str.slice(0, LIMIT - 3) + "...";
    return updatedString;
  }
};
