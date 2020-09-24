import pagesRoutes from "./pages.jsx";

var pages = [
  // {
  //   path: "/timeline-page",
  //   name: "Timeline Page",
  //   mini: "TP",
  //   component: TimelinePage,
  // },
  // { path: "/user-page", name: "User Profile", mini: "UP", component: UserPage },
  // { path: "/rtl-support", name: "RTL Support", mini: "RS", component: RTL },
].concat(pagesRoutes);

var dashRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "design_app",
  //   component: Dashboard,
  // },
  // {
  //   collapse: true,
  //   path: "/pages",
  //   name: "Pages",
  //   state: "openPages",
  //   icon: "design_image",
  //   views: pages,
  // },
  // {
  //   collapse: true,
  //   path: "/components",
  //   name: "Components",
  //   state: "openComponents",
  //   icon: "education_atom",
  //   views: [
  //     {
  //       path: "/components/buttons",
  //       name: "Buttons",
  //       mini: "B",
  //       component: Buttons,
  //     },
  //     {
  //       path: "/components/grid-system",
  //       name: "Grid System",
  //       mini: "GS",
  //       component: GridSystem,
  //     },
  //     {
  //       path: "/components/panels",
  //       name: "Panels",
  //       mini: "P",
  //       component: Panels,
  //     },
  //     {
  //       path: "/components/sweet-alert",
  //       name: "Sweet Alert",
  //       mini: "SA",
  //       component: SweetAlert,
  //     },
  //     {
  //       path: "/components/notifications",
  //       name: "Notifications",
  //       mini: "N",
  //       component: Notifications,
  //     },
  //     { path: "/components/icons", name: "Icons", mini: "I", component: Icons },
  //     {
  //       path: "/components/typography",
  //       name: "Typography",
  //       mini: "T",
  //       component: Typography,
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   path: "/forms",
  //   name: "Forms",
  //   state: "openForms",
  //   icon: "design_bullet-list-67",
  //   views: [
  //     {
  //       path: "/forms/regular-forms",
  //       name: "Regular Forms",
  //       mini: "RF",
  //       component: RegularForms,
  //     },
  //     {
  //       path: "/forms/extended-forms",
  //       name: "Extended Forms",
  //       mini: "EF",
  //       component: ExtendedForms,
  //     },
  //     {
  //       path: "/forms/validation-forms",
  //       name: "Validation Forms",
  //       mini: "VF",
  //       component: ValidationForms,
  //     },
  //     { path: "/forms/wizard", name: "Wizard", mini: "W", component: Wizard },
  //   ],
  // },
  // {
  //   collapse: true,
  //   path: "/tables",
  //   name: "Tables",
  //   state: "openTables",
  //   icon: "files_single-copy-04",
  //   views: [
  //     {
  //       path: "/tables/regular-tables",
  //       name: "Regular Tables",
  //       mini: "RT",
  //       component: RegularTables,
  //     },
  //     {
  //       path: "/tables/extended-tables",
  //       name: "Extended Tables",
  //       mini: "ET",
  //       component: ExtendedTables,
  //     },
  //     {
  //       path: "/tables/react-table",
  //       name: "React Table",
  //       mini: "RT",
  //       component: ReactTable,
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   path: "/maps",
  //   name: "Maps",
  //   state: "openMaps",
  //   icon: "location_pin",
  //   views: [
  //     {
  //       path: "/maps/google-maps",
  //       name: "Google Maps",
  //       mini: "GM",
  //       component: GoogleMaps,
  //     },
  //     {
  //       path: "/maps/full-screen-maps",
  //       name: "Full Screen Map",
  //       mini: "FSM",
  //       component: FullScreenMap,
  //     },
  //     {
  //       path: "/maps/vector-maps",
  //       name: "Vector Map",
  //       mini: "VM",
  //       component: VectorMap,
  //     },
  //   ],
  // },
  // {
  //   path: "/widgets",
  //   name: "Widgets",
  //   icon: "objects_diamond",
  //   component: Widgets,
  // },
  // {
  //   path: "/charts",
  //   name: "Charts",
  //   icon: "business_chart-pie-36",
  //   component: Charts,
  // },
  // {
  //   path: "/calendar",
  //   name: "Calendar",
  //   icon: "media-1_album",
  //   component: Calendar,
  // },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" },
];
export default dashRoutes;
