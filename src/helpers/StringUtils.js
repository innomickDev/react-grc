import { regex } from "../constants/regex";

/**
 * CheckIfNotEmpty is for checking text is empty or not
 * @param text
 * @returns {*|boolean}
 * @constructor
 */
export const CheckIfNotEmpty = text => {
    return !(text === null || /^\s*$/.test(text));
};

// Function for check Email Validation
export const CheckIfEmailIsValid = email => {
    console.log('return result-----', regex.EMAIL.test(email));
    return regex.EMAIL.test(email);
};
// Function for check Password Validation
export const CheckIfPasswordIsValid = password => {
    return regex.PASSWORD.test(password);
};