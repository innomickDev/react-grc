import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import Account from "./AccountReducer";
import Login from "./LoginReducer";
import Category from "./CategoryReducer";
import SubCategory from "./SubCategoryReducer";
import Station from "./StationReducer";
import serachCustomerInfo from "./serachCustomerInfoReducer";
import Claim from "./ClaimReducer";
import CreateCustomer from "./createCustomerReducer";
import Tarif from "./TarifReducer";
import TrainType from "./TrainTypeReducer";

const appReducer = combineReducers({
  form: formReducer,
  account: Account,
  login: Login,
  category: Category,
  subCategory: SubCategory,
  station: Station,
  serachCustomerInfo: serachCustomerInfo,
  claim: Claim,
  createCustomer: CreateCustomer,
  tarif: Tarif,
  trainType: TrainType,
});
const initialState = appReducer({}, {});
const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    state = initialState;
  }
  return appReducer(state, action);
};
export default rootReducer;
