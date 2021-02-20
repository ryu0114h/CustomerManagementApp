import React, { CSSProperties } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Breadcrumb, notification } from "antd";
import {
  TextField,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { fetchCustomers } from "../reducks/customers/operations";
import { CustomerType } from "../reducks/customers/types";

type Props = RouteComponentProps<
  { id: string },
  never,
  { customer: CustomerType }
>;

const AddPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit: SubmitHandler<CustomerType> = (data) => {
    dispatch(fetchCustomers(data));
    notification["success"]({
      message: "保存しました。",
      description: "",
    });
    props.history.push(`/`);
    console.log(data);
  };

  const onError: SubmitErrorHandler<CustomerType> = (data) => {
    notification["error"]({
      message: "正しい値を入力してください。",
      description: "",
    });
    console.log(data);
  };

  return (
    <>
      <BreadcrumbList />

      <form onSubmit={handleSubmit(onSubmit, onError)} style={styles.form}>
        <div style={styles.inputArea}>
          <TextField
            label="苗字"
            name="lastName"
            style={styles.input}
            inputRef={register({ required: true })}
          />
          {errors.lastName && (
            <p style={styles.errors}>苗字を入力してください</p>
          )}
        </div>
        <div style={styles.inputArea}>
          <TextField
            label="名前"
            name="firstName"
            style={styles.input}
            inputRef={register({ required: true })}
          />
          {errors.firstName && (
            <p style={styles.errors}>名前を入力してください</p>
          )}
        </div>
        <div style={styles.inputArea}>
          <TextField
            label="年齢"
            name="age"
            style={styles.input}
            inputRef={register({
              required: true,
              validate: (value) => !isNaN(value),
            })}
          />
          {errors.age && <p style={styles.errors}>年齢を入力してください</p>}
        </div>
        <div style={styles.inputArea}>
          <TextField
            label="住所"
            name="address"
            style={styles.input}
            inputRef={register({ required: true })}
          />
          {errors.address && (
            <p style={styles.errors}>住所を入力してください</p>
          )}
        </div>
        <div style={styles.inputArea}>
          <TextField
            label="メモ"
            name="memo"
            multiline
            rows={3}
            style={styles.input}
            inputRef={register()}
          />
        </div>
        <FormControl
          component="fieldset"
          style={{ marginTop: 40, display: "block" }}>
          <FormLabel component="legend">タグ</FormLabel>
          <FormGroup>
            <FormControlLabel
              inputRef={register()}
              control={<Checkbox name="tags.developer" />}
              label="developer"
            />
            <FormControlLabel
              inputRef={register()}
              control={<Checkbox name="tags.teacher" />}
              label="teacher"
            />
            <FormControlLabel
              inputRef={register()}
              control={<Checkbox name="tags.nice" />}
              label="nice"
            />
            <FormControlLabel
              inputRef={register()}
              control={<Checkbox name="tags.loser" />}
              label="loser"
            />
            <FormControlLabel
              inputRef={register()}
              control={<Checkbox name="tags.cool" />}
              label="cool"
            />
          </FormGroup>
        </FormControl>
        <div style={styles.buttonGroup}>
          <button
            className="ant-btn"
            type="button"
            style={styles.button}
            onClick={() => props.history.goBack()}>
            戻る
          </button>
          <button
            className="ant-btn ant-btn-primary"
            type="submit"
            style={styles.button}>
            保存
          </button>
        </div>
      </form>
    </>
  );
};

export default AddPage;

const BreadcrumbList: React.FC = () => {
  return (
    <Breadcrumb style={styles.breadcrumb}>
      <Breadcrumb.Item href="/">
        <span style={styles.breadcrumbItem}>Home</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span style={styles.breadcrumbItem}>追加ページ</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

const styles: { [key: string]: CSSProperties } = {
  breadcrumb: { marginTop: 20, marginLeft: 120, marginBottom: 20 },
  breadcrumbItem: { fontSize: 16 },
  form: { maxWidth: "500px", margin: "60px auto" },
  inputArea: { margin: "10px 0px", height: 80 },
  label: { marginRight: 10 },
  input: { width: 500 },
  errors: { color: "red", marginLeft: 40, marginTop: 10 },
  buttonGroup: {
    margin: "0px auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 30,
    marginLeft: 30,
    width: 200,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
