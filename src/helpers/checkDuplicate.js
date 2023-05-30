export const checkDuplicate = (array, newObject) => {
  const isDuplicate = array.some((obj) => obj.photoUri === newObject.photoUri);
  return isDuplicate;
};
