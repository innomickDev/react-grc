// import Swagger from 'swagger-client'
import { LANG_CODES } from "../utils";
import axios from "axios";
// creating global instance for the axios to call apis
export const AXIOS_INSTANCE = axios.create();
AXIOS_INSTANCE.defaults.headers.common["Content-Type"] = "application/json";
AXIOS_INSTANCE.defaults.headers.common["Accept-Language"] = LANG_CODES.french;
//  export const  SWAGGER_INSTANCE = Swagger({ spec:specJson }
// console.log(localStorage.getItem("foGRCAuthToken"));
// console.log(localStorage.getItem("foGRCAuthToken"));

if (
  localStorage.getItem("foGRCAuthToken") !== null &&
  localStorage.getItem("foGRCAuthToken") !== undefined
) {
  const token = JSON.parse(localStorage.getItem("foGRCAuthToken"));
  AXIOS_INSTANCE.defaults.headers.common["Authorization"] = `${token}`;
}
// if (
//   localStorage.getItem("lang") !== null &&
//   localStorage.getItem("lang") !== undefined
// ) {
//   //console.log(lang);
//   const lang = localStorage.getItem("lang");
//   // AXIOS_INSTANCE.defaults.headers.common["Accept-Language"] = `${lang}`;
// }

export const LOGIN_CONFIG = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};
export const CONFIG = {
  headers: {
    "Content-Type": "application/json",
  },
};
// base url
let BASE_URL = `${process.env.REACT_APP_SERVER_URL}`;
// if(!navigator.onLine){
//   console.log('user is offline')
//   alert("Please check your internet connection");
// } else{
//   console.log('user is online');
//   BASE_URL = `${process.env.REACT_APP_SERVER_URL}`;
// }
console.log('baseURL----', BASE_URL);

// Login
export const LOGIN_API = `${BASE_URL}`;

// Account
export const ACCOUNT_API = `${BASE_URL}/Account`;

export const CREATE_CLAIM_API = `${BASE_URL}/Claim/CreateClaimByAgent`;
// category
export const CATEGORY_API = `${BASE_URL}/Category`;
// sub category
export const SUB_CATEGORY_API = `${BASE_URL}/SubCategory`;
//  sub category
export const SUB_SUB_CATEGORY_API = `${BASE_URL}/SubSubCatrgory`;

export const CLAIM_API = `${BASE_URL}/Claim`;

export const STATION_API = `${BASE_URL}/Station`;
// create customer
export const CUSTOMER_REGISTRATION_API = `${BASE_URL}/Customer`;

// search customer by email
export const SEARCH_CUSTOMER_API = `${BASE_URL}/Customer`;
// Tarif
export const TARIF_API = `${BASE_URL}/Tarif`;
// Train types
export const TRAIN_TYPE_API = `${BASE_URL}/TrainType`;
