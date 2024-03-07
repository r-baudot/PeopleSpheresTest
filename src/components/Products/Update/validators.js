export const isNameValid = (value) => {
  return !!value.trim().length > 0 && value.trim().length <= 200;
};

export const isCategoriesValid = (value) => {
  return value.length > 0 && value.length <= 5;
};

export const isInputNotNull = (input) => input.trim() !== "";

export const isValidateDate = (expirationDate) => {
  const today = new Date();
  const thirtyDaysFromNow = new Date(today.setDate(today.getDate() + 30));
  const selectedDate = new Date(expirationDate);
  return selectedDate >= thirtyDaysFromNow;
};
