import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { RootState } from "../reducks/store/store";
import { signoutUser } from "../reducks/user/operations";

const Header: React.FC = () => {
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          顧客管理アプリ
        </Typography>
        {user.isSignedIn ? (
          <Button
            color="inherit"
            type="submit"
            onClick={() => dispatch(signoutUser())}>
            ログアウト
          </Button>
        ) : (
          <>
            <Button href="/signin" className={classes.signinButton}>
              サインイン
            </Button>
            <Button href="/signup" className={classes.signupButton}>
              サインアップ
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#333",
      height: 80,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    signupButton: {
      color: "red",
    },
    signinButton: {
      color: "white",
    },
    title: {
      flexGrow: 1,
      color: "white",
      fontWeight: "bold",
      marginLeft: 30,
    },
  })
);
