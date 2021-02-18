import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { fetchCustomers } from "../reducks/customers/operations";
import { CustomerType } from "../reducks/customers/types";
import { RootState } from "../reducks/store/store";
import { notification } from "antd";

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
    <form onSubmit={handleSubmit(onSubmit, onError)} style={styles.form}>
      <div style={{ margin: "10px 0px" }}>
        <label style={styles.label}>苗字</label>
        <input
          className="ant-input"
          name="lastName"
          style={styles.input}
          ref={register({ required: true })}
        />
      </div>
      {errors.lastName && <p style={styles.errors}>苗字を入力してください</p>}
      <div style={{ margin: "10px 0px" }}>
        <label style={styles.label}>名前</label>
        <input
          className="ant-input"
          name="firstName"
          style={styles.input}
          ref={register({ required: true })}
        />
      </div>
      {errors.firstName && <p style={styles.errors}>名前を入力してください</p>}
      <div style={{ margin: "10px 0px" }}>
        <label style={styles.label}>年齢</label>
        <input
          className="ant-input"
          name="age"
          style={styles.input}
          ref={register({
            required: true,
            validate: (value) => !isNaN(value),
          })}
        />
      </div>
      {errors.age && <p style={styles.errors}>年齢を入力してください</p>}
      <div style={{ margin: "10px 0px" }}>
        <label style={styles.label}>住所</label>
        <input
          className="ant-input"
          name="address"
          style={styles.input}
          ref={register({ required: true })}
        />
      </div>
      {errors.address && <p style={styles.errors}>住所を入力してください</p>}
      <button
        className="ant-btn ant-btn-primary"
        type="submit"
        style={{ marginTop: 30, marginLeft: 30 }}>
        保存
      </button>
    </form>
  );
};

export default EditPage;

const styles: { [key: string]: CSSProperties } = {
  form: { maxWidth: "500px", margin: "100px auto" },
  label: { marginRight: 10 },
  input: { width: 350 },
  errors: { color: "red", marginLeft: 40 },
};
