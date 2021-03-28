import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { LibraryBooks, Person, LockOpen, GroupAdd, Dashboard } from "@material-ui/icons";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import CustomersListPage from "./pages/CustomersList/CustomersListPage";
import CustomerAddPage from "./pages/CustomersList/CustomerAddPage";
import CustomerDetailPage from "./pages/CustomersList/CustomerDetailPage";
import CustomerEditPage from "./pages/CustomersList/CustomerEditPage";
import CalendarPage from "./pages/Reservations/CalendarPage";
import SignIn from "./pages/SigninSignup/SignIn";
import SignUp from "./pages/SigninSignup/SignUp";
import StaffProfile from "./pages/StaffProfile/StaffProfile";
import { CustomerType } from "./reducks/customers/types";

export type CustomersListPageRouteComponentProps = RouteComponentProps<
  { id: string },
  never,
  { customer: CustomerType }
>;

export type RoutesType = {
  path:
    | "/customers_list"
    | "/customers_list/new"
    | "/customers_list/detail"
    | "/customers_list/edit"
    | "/reservations"
    | "/profile"
    | "/signin"
    | "/signup";
  name: string;
  icon?: OverridableComponent<SvgIconTypeMap<undefined, "svg">>;
  component: React.FC<CustomersListPageRouteComponentProps> | React.FC;
  layout: "/admin";
  sidebar: boolean;
  isSignedIn: boolean;
}[];

const routes: RoutesType = [
  {
    path: "/customers_list",
    name: "顧客リスト",
    icon: Dashboard,
    component: CustomersListPage,
    layout: "/admin",
    sidebar: true,
    isSignedIn: true,
  },
  {
    path: "/customers_list/new",
    name: "顧客リスト",
    component: CustomerAddPage,
    layout: "/admin",
    sidebar: false,
    isSignedIn: true,
  },
  {
    path: "/customers_list/detail",
    name: "顧客リスト",
    component: CustomerDetailPage,
    layout: "/admin",
    sidebar: false,
    isSignedIn: true,
  },
  {
    path: "/customers_list/edit",
    name: "顧客リスト",
    component: CustomerEditPage,
    layout: "/admin",
    sidebar: false,
    isSignedIn: true,
  },
  {
    path: "/reservations",
    name: "予約管理",
    icon: LibraryBooks,
    component: CalendarPage,
    layout: "/admin",
    sidebar: true,
    isSignedIn: true,
  },
  {
    path: "/profile",
    name: "店舗情報",
    icon: Person,
    component: StaffProfile,
    layout: "/admin",
    sidebar: true,
    isSignedIn: true,
  },
  {
    path: "/signin",
    name: "ログイン",
    icon: LockOpen,
    component: SignIn,
    layout: "/admin",
    sidebar: true,
    isSignedIn: false,
  },
  {
    path: "/signup",
    name: "登録",
    icon: GroupAdd,
    component: SignUp,
    layout: "/admin",
    sidebar: true,
    isSignedIn: false,
  },
];

export default routes;
