export const validateEmail = (email) => {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  };
  
 export const validateMobile = (value) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(value);
  };