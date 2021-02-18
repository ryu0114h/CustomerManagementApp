import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { fetchCustomers } from "../reducks/customers/operations";
import { CustomerType } from "../reducks/customers/types";
import { RootState } from "../reducks/store/store";
import { Breadcrumb, notification } from "antd";
import { TextField } from "@material-ui/core";

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
      <Breadcrumb style={{ margin: 100 }}>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href={`/${props.match.params.id}`}>
          詳細ページ
        </Breadcrumb.Item>
        <Breadcrumb.Item>編集ページ</Breadcrumb.Item>
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
        <button
          className="ant-btn ant-btn-primary"
          type="submit"
          style={{ marginTop: 30, marginLeft: 30 }}>
          保存
        </button>
      </form>
    </>
  );
};

export default EditPage;

const styles: { [key: string]: CSSProperties } = {
  form: { maxWidth: "500px", margin: "100px auto" },
  inputArea: { margin: "10px 0px", height: 100 },
  label: { marginRight: 10 },
  input: { width: 350 },
  errors: { color: "red", marginLeft: 40, marginTop: 10 },
};
