import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Hidden } from "@material-ui/core";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks";
import Button from "../CustomButtons/Button";

import styles from "../../../src/assets/jss/material-dashboard-react/components/headerStyle";
import { RoutesType } from "../../routes";

const useStyles = makeStyles(styles);

type Props = {
  handleDrawerToggle?: () => void;
  routes?: RoutesType;
  color?: "primary" | "info" | "success" | "warning" | "danger";
};

const Header: React.FC<Props> = (props) => {
  const classes = useStyles();
  const makeBrand = () => {
    let name;
    props.routes?.map((prop) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = prop.name;
      }
      return null;
    });
    return name;
  };
  const { color } = props;
  const appBarClasses =
    color &&
    classNames({
      [" " + classes[color]]: color,
    });

  return (
    <AppBar className={classes.appBar + (color ? appBarClasses : "")}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button color="transparent" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton color="inherit" aria-label="open drawer" onClick={props.handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  handleDrawerToggle: PropTypes.func,
};
