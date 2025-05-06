import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./App.jsx"),
  route("/affiliate", "./pages/AffiliatePage.jsx"),
  route("/vip-club", "./pages/VipClubPage.jsx"),
] satisfies RouteConfig;

