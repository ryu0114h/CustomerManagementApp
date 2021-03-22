import React from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
// core components
import Button from "../CustomButtons/Button";

import styles from "../../assets/jss/material-dashboard-react/components/headerLinksStyle";
import { signoutStaff } from "../../reducks/staff/operations";

const useStyles = makeStyles(styles);

const AdminNavbarLinks: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState<HTMLElement | null>(null);

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const doSignOut = () => {
    if (window.confirm("本当にログアウトしますか？")) {
      dispatch(signoutStaff());
    }
  };

  return (
    <div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}>
          <Hidden mdUp implementation="css">
            <Person className={classes.icons} />
          </Hidden>
          <p className={classes.linkText}>アカウント▼</p>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={classNames({ [classes.popperClose]: !openProfile }) + " " + classes.popperNav}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === "bottom" ? "center top" : "center bottom",
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem onClick={handleCloseProfile} className={classes.dropdownItem}>
                      ユーザ情報
                    </MenuItem>
                    <MenuItem onClick={doSignOut} className={classes.dropdownItem}>
                      ログアウト
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
};

export default AdminNavbarLinks;
