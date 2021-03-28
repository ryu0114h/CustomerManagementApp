import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { createStyles, makeStyles, StyleRules } from "@material-ui/core/styles";
import { InputLabel } from "@material-ui/core";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import { fetchStaff, updateStaff } from "../../reducks/staff/operations";
import { RootState } from "../../reducks/store/store";

const styles: StyleRules = createStyles({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
});

const useStyles = makeStyles(styles);

const UserProfile: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const staff = useSelector((state: RootState) => state.staff);

  const { register, handleSubmit, reset, errors } = useForm({
    defaultValues: {
      ...staff,
    },
  });

  useEffect(() => {
    reset(staff);
  }, [staff, reset]);

  useEffect(() => {
    dispatch(fetchStaff());
  }, []);

  const onSubmit = useCallback(
    (data) => {
      dispatch(updateStaff(data));
    },
    [staff]
  );

  const onError = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>プロフィール編集</h4>
              <p className={classes.cardCategoryWhite}>プロフィールを編集できます</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel style={{ color: "#AAAAAA", marginTop: 30 }}>スタッフ名</InputLabel>
                  <CustomInput
                    id="name"
                    error={!!errors?.name}
                    errorMessage={errors?.name?.message}
                    formControlProps={{
                      fullWidth: true,
                      style: { margin: 0 },
                    }}
                    inputProps={{ name: "name", inputRef: register({ required: "スタッフ名を入力してください" }) }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel style={{ color: "#AAAAAA", marginTop: 30 }}>メールアドレス</InputLabel>
                  <CustomInput
                    id="email"
                    error={!!errors?.email}
                    errorMessage={errors?.email?.message}
                    formControlProps={{
                      fullWidth: true,
                      style: { margin: 0 },
                    }}
                    inputProps={{ name: "email", inputRef: register({ required: "メールアドレスを入力してください" }) }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <InputLabel style={{ color: "#AAAAAA", marginTop: 30 }}>郵便番号</InputLabel>
                  <CustomInput
                    id="postal_code"
                    formControlProps={{
                      fullWidth: true,
                      style: { margin: 0 },
                    }}
                    inputProps={{ name: "postal_code", inputRef: register }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                  <InputLabel style={{ color: "#AAAAAA", marginTop: 30 }}>住所</InputLabel>
                  <CustomInput
                    id="address"
                    formControlProps={{
                      fullWidth: true,
                      style: { margin: 0 },
                    }}
                    inputProps={{ name: "address", inputRef: register }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA", marginTop: 30 }}>紹介文</InputLabel>
                  <CustomInput
                    id="introduction_text"
                    formControlProps={{
                      fullWidth: true,
                      style: { margin: 0 },
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      name: "introduction_text",
                      inputRef: register,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button type="submit" color="primary">
                更新する
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </form>
  );
};

export default UserProfile;
