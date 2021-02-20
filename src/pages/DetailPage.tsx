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
    state.customers.find(
      (customer) => customer.id === Number(props.match.params.id)
    )
  );

  const alertConfirm = () => {
    if (customer) {
      dispatch(deleteCustomers(customer.id));
      notification["success"]({
        message: "削除しました。",
        description: "",
      });
      props.history.push("/");
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
      <BreadcrumbList />

      <div>
        {customer && (
          <Card
            title={`${customer.lastName} ${customer.firstName} さんの情報`}
            extra={
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  to={{
                    pathname: `/${customer.id}/edit`,
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
            <p style={styles.p}>
              タグ{" "}
              <span style={styles.value}>
                {Object.keys(customer.tags).map(
                  (key) =>
                    customer.tags[key] && (
                      <Tag color="blue" key={key} style={styles.tag}>
                        {key}
                      </Tag>
                    )
                )}
              </span>
            </p>
            {customer.memo && (
              <p style={styles.p}>
                メモ <span style={styles.value}>{customer.memo}</span>
              </p>
            )}
          </Card>
        )}
      </div>
    </>
  );
};

export default DetailPage;

const BreadcrumbList: React.FC = () => {
  return (
    <Breadcrumb style={styles.breadcrumb}>
      <Breadcrumb.Item href="/">
        <span style={styles.breadcrumbItem}>Home</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span style={styles.breadcrumbItem}>詳細ページ</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

const styles: { [key: string]: CSSProperties } = {
  breadcrumb: { marginTop: 20, marginLeft: 120, marginBottom: 20 },
  breadcrumbItem: { fontSize: 16 },
  card: { width: 700, margin: "100px auto" },
  p: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  value: { marginLeft: 40 },
  tag: { fontSize: 20, padding: 5 },
};
