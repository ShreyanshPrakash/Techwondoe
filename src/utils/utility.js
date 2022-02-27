

export const isFormDataValid = (formData = {}) => {
    let isInvalidField = false;
    for (const field in formData) {
      if (!formData[field]) {
        isInvalidField = true;
      }
    }
    return isInvalidField;
}