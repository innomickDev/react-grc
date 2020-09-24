import { emailRegex, phoneRegex, zipCodeRegex } from "./index";

export const required = (value) => {
  return value ? undefined : "ErroMsg.REQUIRED";
};

// validation for zip code
// export const validateZipCode = (value) =>
//   zipCodeRegex.test(value) ? null : "Please enter proper code";

// validation for mobile code
// export const validatePhone = (value) =>
//   phoneRegex.test(value) ? null : "Validate.PHONE";

// validation for email
// export function validateEmail(email) {
//   // eslint-disable-next-line max-len, no-useless-escape
//   const test = emailRegex.test(email);
//   return email && email !== "" && !test ? "Invalid email address" : null;
// }
// export function matchEmail(email, cEmail) {
//   return email != cEmail.Email ? "Email doesn't match" : null;
// }

export const validatePassword = (value) =>
  value.length < 6 ? "Password must be 6 characters or more" : null;

export function matchPassword(password, cPassword) {
  return password != cPassword ? "Password does not match" : null;
}
//max length validation
export const maxLength = (max) => (value) => {
  return value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined;
};
//min length validation
export const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

// Mobile Otp Length
export const otpLength = (max) => (value) => {
  return value && value.length > max
    ? `Otp be ${max} characters only`
    : undefined;
};

export const validateImageWeight = (imageFile) => {
  if (imageFile && imageFile.size) {
    // Get image size in kilobytes
    const imageFileKb = imageFile.size / 1024;
    const { maxWeight } = this.props;
    if (imageFileKb > maxWeight) {
      return `Image size must be less or equal to ${maxWeight}kb`;
    }
  }
};
