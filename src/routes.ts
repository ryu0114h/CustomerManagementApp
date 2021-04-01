import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { LibraryBooks, Person, LockOpen, GroupAdd, Dashboard } from "@material-ui/icons";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import UsersListPage from "./pages/UsersList/UsersListPage";
import UserAddPage from "./pages/UsersList/UserAddPage";
import UserDetailPage from "./pages/UsersList/UserDetailPage";
import UserEditPage from "./pages/UsersList/UserEditPage";
import CalendarPage from "./pages/Reservations/CalendarPage";
import SignIn from "./pages/SigninSignup/SignIn";
import SignUp from "./pages/SigninSignup/SignUp";
import StaffProfile from "./pages/StaffProfile/StaffProfile";
import { UserType } from "./reducks/users/types";

export type UsersListPageRouteComponentProps = RouteComponentProps<{ id: string }, never, { user: UserType }>;

export type RoutesType = {
  path:
    | "/users_list"
    | "/users_list/new"
    | "/users_list/detail"
    | "/users_list/edit"
    | "/reservations"
    | "/profile"
    | "/signin"
    | "/signup";
  name: string;
  icon?: OverridableComponent<SvgIconTypeMap<undefined, "svg">>;
  component: React.FC<UsersListPageRouteComponentProps> | React.FC;
  layout: "/admin";
  sidebar: boolean;
  isSignedIn: boolean;
}[];

const routes: RoutesType = [
  {
    path: "/users_list",
    name: "顧客リスト",
    icon: Dashboard,
    component: UsersListPage,
    layout: "/admin",
    sidebar: true,
    isSignedIn: true,
  },
  {
    path: "/users_list/new",
    name: "顧客リスト",
    component: UserAddPage,
    layout: "/admin",
    sidebar: false,
    isSignedIn: true,
  },
  {
    path: "/users_list/detail",
    name: "顧客リスト",
    component: UserDetailPage,
    layout: "/admin",
    sidebar: false,
    isSignedIn: true,
  },
  {
    path: "/users_list/edit",
    name: "顧客リスト",
    component: UserEditPage,
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
