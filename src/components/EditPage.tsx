import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Breadcrumb, notification } from "antd";
import { TextField } from "@material-ui/core";
import { fetchCustomers } from "../reducks/customers/operations";
import { CustomerType } from "../reducks/customers/types";
import { RootState } from "../reducks/store/store";

type Props = RouteComponentProps<
  { id: string },
  never,
  { customer: CustomerType }
>;

const EditPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const customer = useSelector((state: RootState) =>
    state.customers.find((customer) => customer.key === props.match.params.id)
  );

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { ...customer },
  });

  const onSubmit: SubmitHandler<CustomerType> = (data) => {
    dispatch(fetchCustomers({ ...customer, ...data }));
    notification["success"]({
      message: "保存しました。",
      description: "",
    });
    props.history.push(`/${customer?.key}`);
  };
  const onError: SubmitErrorHandler<CustomerType> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Breadcrumb style={styles.breadcrumb}>
        <Breadcrumb.Item href="/">
          <span style={styles.breadcrumbItem}>Home</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href={`/${props.match.params.id}`}>
          <span style={styles.breadcrumbItem}>詳細ページ</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={styles.breadcrumbItem}>編集ページ</span>
        </Breadcrumb.Item>
      </Breadcrumb>

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
        <button
          className="ant-btn ant-btn-primary"
          type="submit"
          style={styles.button}>
          保存
        </button>
      </form>
    </>
  );
};

export default EditPage;

const styles: { [key: string]: CSSProperties } = {
  breadcrumb: { marginTop: 50, marginLeft: 120, marginBottom: 40 },
  breadcrumbItem: { fontSize: 16 },
  form: { maxWidth: "500px", margin: "100px auto" },
  inputArea: { margin: "10px 0px", height: 80 },
  label: { marginRight: 10 },
  input: { width: 350 },
  errors: { color: "red", marginLeft: 40, marginTop: 10 },
  button: { marginTop: 30, marginLeft: 30 },
};
