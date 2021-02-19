import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Breadcrumb, Card, notification, Popconfirm, Tag } from "antd";
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
    <>
      <Breadcrumb style={styles.breadcrumb}>
        <Breadcrumb.Item href="/">
          <a style={styles.breadcrumbItem}>Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span style={styles.breadcrumbItem}>詳細ページ</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <div>
        {customer && (
          <Card
            title={`${customer.lastName} ${customer.firstName} さんの情報`}
            extra={
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  to={{
                    pathname: `/${customer.key}/edit`,
                    state: { customer },
                  }}
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
            <p style={styles.p}>
              番号 <span style={styles.value}>{customer.key}</span>
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
            <p style={styles.p}>
              タグ{" "}
              <span style={styles.value}>
                {customer.tags.map((tag) => (
                  <Tag color="blue" key={tag} style={styles.tag}>
                    {tag}
                  </Tag>
                ))}
              </span>
            </p>
          </Card>
        )}
      </div>
    </>
  );
};

export default DetailPage;

const styles: { [key: string]: CSSProperties } = {
  breadcrumb: { marginTop: 50, marginLeft: 120, marginBottom: 40 },
  breadcrumbItem: { fontSize: 16 },
  card: { width: 700, margin: "100px auto" },
  p: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  value: { marginLeft: 20 },
  tag: { fontSize: 20, padding: 5 },
};
