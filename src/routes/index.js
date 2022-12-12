import React from "react";
import Loadable from "react-loadable";
import { Redirect } from "react-router-dom";
import { userIs } from "../components/Auth/AccessControl";
import ResetPasswordPage from "../views/ResetPasswordPage/ResetPassword";

const loading = () => <div></div>;
const LandingPage = Loadable({
  loader: () => import("../views/LandingPage/LandingPage"),
  loading,
});

const UserProfile = Loadable({
  loader: () => import("../views/UserProfile"),
  loading,
});

const indexRoutes = [
  {
    path: "/",
    exact: true,
    name: "LandingPage",
    Component: (props) => {
      const { location } = props;
      return userIs(["user"]) ? (
        <Redirect
          to={{
            pathname: "/dashboard/user",
            state: { from: location },
          }}
        />
      ) : (
        <LandingPage {...props} />
      );
    },
  },
  {
    path: `/dashboard/user`,
    name: "User Profile",
    exact: true,
    Component: (props) => {
      const { location } = props;
      if (userIs(["user"])) {
        return <UserProfile {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        );
      }
    },
  },

  {
    path: "/:userType/reset-password/:token",
    exact: true,
    name: "ResetPasswordPage",
    Component: (props) => {
      const { location } = props;
      const { match } = props || {};
      const { params } = match || {};
      const { userType } = params || {};
      // const inValidUserType = !["user", "admin"].includes(userType);
      // if (inValidUserType) return <Page404 {...props} />;

      return userIs([userType]) ? (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      ) : (
        <ResetPasswordPage {...props} />
      );
    },
  },

  {
    path: `/buycrypto`,
    exact: true,
    name: "Buy Cryto",
    Component: Loadable({
      loader: () =>
        import("../views/BuyCrypto/BuyCrypto" /* webpackChunkName: "layout" */),
      loading,
    }),
  },
  {
    path: `/register`,
    exact: true,
    name: "Register",
    Component: Loadable({
      loader: () =>
        import("../components/Auth/RefReg" /* webpackChunkName: "layout" */),
      loading,
    }),
  },
];

export default indexRoutes;
