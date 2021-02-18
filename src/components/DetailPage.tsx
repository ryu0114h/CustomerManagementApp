import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Card, notification, Popconfirm, Tag } from "antd";
import { deleteCustomers } from "../reducks/customers/operations";
import { CustomerType } from "../reducks/customers/types";
import { RootState } from "../reducks/store/store";

type Props = RouteComponentProps<
  { id: string },
  never,
  { customer: CustomerType }
>;

const DetailPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const customer = useSelector((state: RootState) =>
    state.customers.find((customer) => customer.key === props.match.params.id)
  );

  const alertConfirm = () => {
    dispatch(deleteCustomers(customer?.key as string));
    notification["success"]({
      message: "削除しました。",
      description: "",
    });
    props.history.push("/");
  };

  const alertCancel = () => {
    notification["info"]({
      message: "キャンセルしました。",
      description: "",
    });
  };

  return (
    <div>
      {customer && (
        <Card
          title={`${customer.lastName} ${customer.firstName} さんの情報`}
          extra={
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link
                to={{ pathname: `/${customer.key}/edit`, state: { customer } }}
                style={{ margin: 10 }}>
                編集
              </Link>
              <Popconfirm
                title="削除してもよろしいですか？"
                onConfirm={alertConfirm}
                onCancel={alertCancel}
                okText="Yes"
                cancelText="No">
                <a style={{ margin: 10 }}>削除</a>
              </Popconfirm>
            </div>
          }
          style={styles.card}>
          <p style={styles.p}>番号 : {customer.key}</p>
          <p style={styles.p}>
            名前 : {customer.lastName} {customer.firstName}
          </p>
          <p style={styles.p}></p>
          <p style={styles.p}>住所 : {customer.address}</p>
          <p style={styles.p}>年齢 : {customer.age}</p>
          <p style={styles.p}>
            タグ :{" "}
            {customer.tags.map((tag) => (
              <Tag color="blue" key={tag} style={styles.tag}>
                {tag}
              </Tag>
            ))}
          </p>
        </Card>
      )}
    </div>
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
  tag: { fontSize: 20, padding: 5 },
};
