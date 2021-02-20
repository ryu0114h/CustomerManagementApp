import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Popconfirm, Table, Tag, notification, Breadcrumb, Button } from "antd";
import "antd/dist/antd.css";
import { RootState } from "../reducks/store/store";
import { deleteCustomers } from "../reducks/customers/operations";
import { CustomerType } from "../reducks/customers/types";

const { Column, ColumnGroup } = Table;

const HomePage: React.FC = () => {
  const customers = useSelector((state: RootState) => state.customers);
  const dispatch = useDispatch();

  const alertConfirm = (id: number) => {
    dispatch(deleteCustomers(id));
    notification["success"]({
      message: "削除しました。",
      description: "",
    });
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

      <div style={styles.container}>
        <Link to={{ pathname: "/add" }}>
          <Button type="primary" size="large" style={styles.addButton}>
            追加
          </Button>
        </Link>
        <Table dataSource={customers} rowKey="id">
          <Column title="番号" dataIndex="id" key="id" />
          <ColumnGroup title="名前">
            <Column title="性" dataIndex="lastName" key="lastName" />
            <Column title="名" dataIndex="firstName" key="firstName" />
          </ColumnGroup>
          <Column
            title="年齢"
            dataIndex="age"
            key="age"
            sorter={(a: CustomerType, b: CustomerType) => a.age - b.age}
          />
          <Column title="住所" dataIndex="address" key="address" />
          <Column
            title="タグ"
            dataIndex="tags"
            key="tags"
            render={(tags: string[]) => (
              <>
                {Object.keys(tags).map(
                  (key) =>
                    tags[key] && (
                      <Tag color="blue" key={key}>
                        {key}
                      </Tag>
                    )
                )}
              </>
            )}
          />
          <Column
            title=""
            dataIndex="id"
            key="detail"
            render={(id) => {
              const customer = customers.find((customer) => customer.id === id);
              return (
                <Link to={{ pathname: `/${id}`, state: { customer } }}>
                  詳細
                </Link>
              );
            }}
          />
          <Column
            title=""
            dataIndex="id"
            key="delete"
            render={(id) => {
              return (
                <Popconfirm
                  title="削除してもよろしいですか？"
                  onConfirm={() => alertConfirm(id)}
                  onCancel={alertCancel}
                  okText="Yes"
                  cancelText="No">
                  <a>削除</a>
                </Popconfirm>
              );
            }}
          />
        </Table>
      </div>
    </>
  );
};

export default HomePage;

const BreadcrumbList: React.FC = () => {
  return (
    <Breadcrumb style={styles.breadcrumb}>
      <Breadcrumb.Item>
        <span style={styles.breadcrumbItem}>Home</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: { width: "90%", margin: "10px auto" },
  breadcrumb: { marginTop: 20, marginLeft: 120, marginBottom: 20 },
  breadcrumbItem: { fontSize: 16 },
  addButton: { marginBottom: 30, float: "right" },
};
