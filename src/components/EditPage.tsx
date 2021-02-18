import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
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
    props.history.push("/");
  };
  const onError: SubmitErrorHandler<CustomerType> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      style={{ maxWidth: "500px", margin: "100px auto" }}>
      <div style={{ margin: "10px 0px" }}>
        <label style={{ marginRight: 10 }}>苗字</label>
        <input
          className="ant-input"
          name="lastName"
          style={{ width: 350 }}
          ref={register({ required: true })}
        />
      </div>
      {errors.lastName && (
        <p style={{ color: "red", marginLeft: 40 }}>苗字を入力してください</p>
      )}
      <div style={{ margin: "10px 0px" }}>
        <label style={{ marginRight: 10 }}>名前</label>
        <input
          className="ant-input"
          name="firstName"
          style={{ width: 350 }}
          ref={register({ required: true })}
        />
      </div>
      {errors.firstName && (
        <p style={{ color: "red", marginLeft: 40 }}>名前を入力してください</p>
      )}
      <div style={{ margin: "10px 0px" }}>
        <label style={{ marginRight: 10 }}>年齢</label>
        <input
          className="ant-input"
          name="age"
          style={{ width: 350 }}
          ref={register({
            required: true,
            validate: (value) => !isNaN(value),
          })}
        />
      </div>
      {errors.age && (
        <p style={{ color: "red", marginLeft: 40 }}>年齢を入力してください</p>
      )}
      <div style={{ margin: "10px 0px" }}>
        <label style={{ marginRight: 10 }}>住所</label>
        <input
          className="ant-input"
          name="address"
          style={{ width: 350 }}
          ref={register({ required: true })}
        />
      </div>
      {errors.address && (
        <p style={{ color: "red", marginLeft: 40 }}>住所を入力してください</p>
      )}
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
