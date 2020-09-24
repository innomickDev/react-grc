// New paages
import LoginPageComponent from "../views/Pages/Login";
import ForgotPasswordComponent from "../views/Pages/ForgotPassword";
import InitiateClaim from "../views/Pages/ClaimComponent";
import ResearchClaim from "../views/Pages/ClaimComponent/Research";
import ChangePasswordComponent from "../views/Pages/ChangePassword";
import ViewClaimDetails from "../views/Pages/ClaimComponent/ViewClaimDetails";
import UpdateClaim from "../views/Pages/ClaimComponent/UpdateClaim";
import SuccessClaimDetails from "../views/Pages/ClaimComponent/SuccessClaim";
import ErrorHandlePage from "../views/Pages/ErrorHandlePage";

const pagesRoutes = [
  {
    path: "/pages/login",
    name: "Login",
    short: "S'identifier",
    mini: "LP",
    component: LoginPageComponent,
  },
  {
    path: "/pages/forgot-password",
    name: "forgot-password",
    short: "Forgot password",
    mini: "FP",
    component: ForgotPasswordComponent,
  },
  {
    path: "/pages/research-claim",
    name: "research-claim",
    short: " Rechercher une réclamation",
    mini: "RC",
    component: ResearchClaim,
  },
  {
    path: "/pages/initiate-claim",
    name: "initiate-claim",
    short: "Créer une réclamation",
    mini: "IC",
    component: InitiateClaim,
  },

  {
    path: "/pages/change-password",
    name: "change-password",
    short: "Change password",
    mini: "CP",
    component: ChangePasswordComponent,
  },
  {
    path: "/pages/view-claim-details",
    name: "view-claim-details",
    short: "View claim details",
    mini: "VC",
    component: ViewClaimDetails,
  },
  {
    path: "/pages/update-claim",
    name: "update-claim",
    short: "Update claim",
    mini: "UC",
    component: UpdateClaim,
  },
  {
    path: "/pages/claim-details",
    name: "claim-details",
    short: "Claim details",
    mini: "CD",
    component: SuccessClaimDetails,
  },
  {
    path: "/pages/error-page",
    name: "error-page",
    short: "Error Handle",
    mini: "EH",
    component: ErrorHandlePage,
  },

  { redirect: true, path: "/", pathTo: "/pages/login", name: "login" },
];

export default pagesRoutes;
