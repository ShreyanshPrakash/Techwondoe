export const isFormDataValid = (formData = {}) => {
  let isValidField = true;
  for (const field in formData) {
    if (!formData[field]) {
      isValidField = false;
    }
  }
  return isValidField;
};

export const isEmailValid = email => {
  //eslint-disable-next-line
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};
