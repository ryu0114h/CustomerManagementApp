import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { notification } from "antd";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../../components/Copyright";
import { InputFormStaffType } from "../../reducks/staff/types";
import { signupStaffApi } from "../../api/staffApi";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit: SubmitHandler<InputFormStaffType> = (data) => {
    signupStaffApi(data)
      .then((res) => {
        dispatch(push("/"));
        notification["success"]({
          message: "登録できました。",
          description: "",
        });
        console.log(res.data);
      })
      .catch((err) => {
        notification["error"]({
          message: "登録に失敗しました。",
          description: "",
        });
        console.log(err.message);
      });
    console.log(data);
  };
  const onError: SubmitErrorHandler<InputFormStaffType> = (data) => {
    notification["error"]({
      message: "ユーザー登録に失敗しました。",
      description: "",
    });
    console.log(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登録
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit, onError)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register({
                  required: "アドレスを入力してください。",
                  pattern: {
                    value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                    message: "正しいアドレスを入力してください。",
                  },
                })}
              />
            </Grid>
            {errors.email && <p className={classes.errors}>{errors.email.message}</p>}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register({
                  required: "パスワードを入力してください。",
                  min: {
                    value: 6,
                    message: "6文字以上のパスワードを入力してください。",
                  },
                  pattern: {
                    value: /^[a-z\d]{6,100}$/i,
                    message: "6文字以上の英数字を入力してください。",
                  },
                })}
              />
            </Grid>
            {errors.password && <p className={classes.errors}>{errors.password.message}</p>}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            登録
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                既にアカウントをお持ちの方はログインへ
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errors: { color: "red", marginLeft: 40, marginTop: 10 },
}));
