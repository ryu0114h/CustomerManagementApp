import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, notification, Popconfirm } from "antd";
import { deleteCustomer } from "../../reducks/customers/operations";
import { RootState } from "../../reducks/store/store";
import { CustomersListPageRouteComponentProps } from "../../routes";

const DetailPage: React.FC<CustomersListPageRouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const customer = useSelector((state: RootState) =>
    state.customers.find((customer) => customer.id === props.location.state.customer.id)
  );

  const alertConfirm = () => {
    if (customer) {
      dispatch(deleteCustomer(customer.id));
    }
  };

  const alertCancel = () => {
    notification["info"]({
      message: "キャンセルしました。",
      description: "",
    });
  };

  return (
    <>
      {customer && (
        <>
          <Card title={`${customer.lastName} ${customer.firstName} さんの情報`} style={styles.card}>
            <p style={styles.p}>
              番号 <span style={styles.value}>{customer.id}</span>
            </p>
            <p style={styles.p}>
              名前{" "}
              <span style={styles.value}>
                {customer.lastName} {customer.firstName}
              </span>
            </p>
            <p style={styles.p}></p>
            <p style={styles.p}>
              住所 <span style={styles.value}>{customer.address}</span>
            </p>
            <p style={styles.p}>
              年齢 <span style={styles.value}>{customer.age}</span>
            </p>
            {customer.memo && (
              <p style={styles.p}>
                メモ <span style={styles.value}>{customer.memo}</span>
              </p>
            )}
          </Card>
          <div style={styles.buttonGroup}>
            <button className="ant-btn" type="button" style={styles.button} onClick={() => props.history.goBack()}>
              戻る
            </button>
            <Link
              className="ant-btn ant-btn-primary"
              style={styles.button}
              to={{
                pathname: `/admin/customers_list/edit`,
                state: { customer },
              }}>
              編集
            </Link>
          </div>
          <Popconfirm
            title="削除してもよろしいですか？"
            onConfirm={alertConfirm}
            onCancel={alertCancel}
            okText="Yes"
            cancelText="No">
            <a style={styles.deleteButton}>削除する</a>
          </Popconfirm>
        </>
      )}
    </>
  );
};

export default DetailPage;

const styles: { [key: string]: CSSProperties } = {
  card: { width: 700, margin: "100px auto" },
  p: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  value: { marginLeft: 40 },
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
  deleteButton: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 200,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "red",
  },
};
