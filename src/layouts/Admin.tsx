import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbars/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import routes, { RoutesType } from "../routes";
import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle";
import SwitchRoutes from "../SwitchRoutes";
import { RootState } from "../reducks/store/store";
import { fetchCustomers } from "../reducks/customers/operations";

const useStyles = makeStyles(styles);

const Admin: React.FC = ({ ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [color] = useState("blue");
  const [mobileOpen, setMobileOpen] = useState(false);
  const staff = useSelector((state: RootState) => state.staff);
  const isSignedIn = staff.isSignedIn;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  const getSwitchRoutes = (): RoutesType => routes.filter((route) => route.isSignedIn === isSignedIn);
  const getSidebarRoutes = (): RoutesType => getSwitchRoutes().filter((route) => route.sidebar);

  useEffect(() => {
    dispatch(fetchCustomers());
    window.addEventListener("resize", resizeFunction);

    return function cleanup() {
      window.removeEventListener("resize", resizeFunction);
    };
  }, []);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={getSidebarRoutes()}
        logoText="顧客管理アプリ"
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel}>
        <Navbar routes={routes} handleDrawerToggle={handleDrawerToggle} {...rest} />
        <div className={classes.content}>
          <div className={classes.container}>
            <SwitchRoutes routes={getSwitchRoutes()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
