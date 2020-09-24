import { toast } from "react-toastify";
import moment from "moment";

/*call this const for success alerts */
export const showError = (msg) => toast.error(msg);
/*call this const for failure alerts */
export const showSuccess = (msg) => toast.success(msg);

export function dateTimeFormat(date) {
  // console.log(date);
  let formatedDate = new Date(Number(date) * 1000);
  formatedDate = moment(formatedDate).format("DD/MM/YYYY");
  // console.log(formatedDate);
  return formatedDate !== "01/01/1753" &&
    formatedDate !== "01/01/1900" &&
    formatedDate !== "01/01/1970"
    ? formatedDate
    : "";
}

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) { };
};

export const getLangBasedStationLabel = (langType) => {
  // console.log(langType);
  switch (localStorage.getItem("lang")) {
    case "en-US":
      return langType ? langType.descriptionEn : "Aucune";
    case "fr-FR":
      return langType ? langType.descriptionFr : "Aucune";
    case "ar-MA":
      return langType ? langType.descriptionAr : "Aucune";
    default:
      return false;
  }
};

export const getLangBasedDataLabel = (langType) => {
  // console.log(langType);
  switch (localStorage.getItem("lang")) {
    case "en-US":
      return langType ? langType.labelEn : "Aucune";
    case "fr-FR":
      return langType ? langType.labelFr : "Aucune";
    case "ar-AR":
      return langType ? langType.labelAr : "Aucune";
    default:
      return false;
  }
};
// Language based data label
export const getLangBasedItems = (selectArray, placeholder) => {
  // console.log(selectArray, "hello");
  const dataList = selectArray;
  let finalData = [];
  if (dataList) {
    switch (localStorage.getItem("lang")) {
      case "en-US":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].labelEn
              ? dataList[i].labelEn
              : dataList[i].designationEn,
            value: dataList[i].tarifId ? dataList[i].tarifId : dataList[i].code,
          });
        }
        break;
      case "fr-FR":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].labelFr
              ? dataList[i].labelFr
              : dataList[i].designationFr,
            value: dataList[i].tarifId ? dataList[i].tarifId : dataList[i].code,
          });
        }
        break;

      case "ar-MA":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].labelAr
              ? dataList[i].labelAr
              : dataList[i].designationAr,
            value: dataList[i].tarifId ? dataList[i].tarifId : dataList[i].code,
          });
        }
        break;
      default:
    }
  }
  return finalData;
};

// getting label with language
export const getLangBasedStations = (selectArray, placeholder) => {
  // console.log(selectArray, "hello");
  const dataList = selectArray;
  let finalData = [];
  if (dataList) {
    switch (localStorage.getItem("lang")) {
      case "en-US":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].descriptionEn
              ? dataList[i].descriptionEn
              : dataList[i].designationEn,
            value: dataList[i].codeGare
              ? dataList[i].codeGare
              : dataList[i].code, //todo
          });
        }
        break;
      case "fr-FR":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].descriptionFr
              ? dataList[i].descriptionFr
              : dataList[i].designationFr,
            value: dataList[i].codeGare
              ? dataList[i].codeGare
              : dataList[i].code, //todo
          });
        }
        break;

      case "ar-MA":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].descriptionAr
              ? dataList[i].descriptionAr
              : dataList[i].designationAr,
            value: dataList[i].codeGare
              ? dataList[i].codeGare
              : dataList[i].code, //todo
          });
        }
        // console.log(finalData);
        break;
      default:
    }
  }
  // dataList.map((data, key) => {

  // });
  return finalData;
};
// querystring
export const createQueryString = (objParam) => {
  const queryString = Object.keys(objParam)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(objParam[k])}`)
    .join("&");
  return queryString;
};

export const getFileExtension = (base64String) => {
  //const data = base64String.slice(0, 5);

  // console.log(base64String);
  switch (base64String.toUpperCase()) {
    case "IVBOR":
      return "data:image/png;base64,";
    case "/9J/4":
      return "data:image/jpeg;base64,";
    case "/9j/2":
      return "data:image/jpg;base64,";
    case "R0lGO":
      return "data:image/gif;base64,";
    case "JVBER":
      return "data:application/pdf;base64,";
    case "Qk06A":
      return "data:image/bmp;base64,";
    default:
      return false;
  }
};

// For tarrif
export const getLangBasedTarifData = (selectArray, placeholder) => {
  // console.log(selectArray, "hello");
  const dataList = selectArray;
  let finalData = [];
  if (dataList) {
    switch (localStorage.getItem("lang")) {
      case "en-US":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].designationEn,
            value: dataList[i].code, //todo
          });
        }
        break;
      case "fr-FR":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].designationFr,
            value: dataList[i].code, //todo
          });
        }
        break;

      case "ar-MA":
        for (let i = 0; i < dataList.length; i++) {
          finalData.push({
            label: dataList[i].designationAr,
            value: dataList[i].code, //todo
          });
        }
        // console.log(finalData);
        break;
      default:
    }
  }
  // dataList.map((data, key) => {

  // });
  return finalData;
};

export const getLangBasedTarifLabel = (langType) => {
  // console.log(langType);
  switch (localStorage.getItem("lang")) {
    case "en-US":
      return langType ? langType.designationEn : "Aucune";
    case "fr-FR":
      return langType ? langType.designationFr : "Aucune";
    case "ar-AR":
      return langType ? langType.designationAr : "Aucune";
    default:
      return false;
  }
};

export function calenderFormat(date) {
  // console.log(date);
  let formatedDate = new Date(parseInt(date) * 1000);
  formatedDate = moment(formatedDate).format("YYYY-MM-DD");
  // console.log(formatedDate);
  return formatedDate;
}
