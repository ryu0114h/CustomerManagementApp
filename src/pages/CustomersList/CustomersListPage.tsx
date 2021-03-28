import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Popconfirm, Table, notification, Button } from "antd";
import "antd/dist/antd.css";
import { RootState } from "../../reducks/store/store";
import { deleteCustomer, fetchCustomers } from "../../reducks/customers/operations";
import { CustomerType } from "../../reducks/customers/types";

const { Column, ColumnGroup } = Table;

const CustomersListPage: React.FC = () => {
  const customers = useSelector((state: RootState) => state.customers);
  const dispatch = useDispatch();

  const alertConfirm = (id: number) => {
    dispatch(deleteCustomer(id));
  };

  const alertCancel = () => {
    notification["info"]({
      message: "キャンセルしました。",
      description: "",
    });
  };

  React.useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  return (
    <>
      <div style={styles.container}>
        <Link to="/admin/customers_list/new">
          <Button type="primary" size="large" style={styles.addButton}>
            追加
          </Button>
        </Link>
        <Table dataSource={customers} rowKey="id">
          <Column title="番号" dataIndex="id" key="id" sorter={(a: CustomerType, b: CustomerType) => a.id - b.id} />
          <ColumnGroup title="名前">
            <Column title="性" dataIndex="lastName" key="lastName" />
            <Column title="名" dataIndex="firstName" key="firstName" />
          </ColumnGroup>
          <Column title="年齢" dataIndex="age" key="age" sorter={(a: CustomerType, b: CustomerType) => a.age - b.age} />
          <Column title="住所" dataIndex="address" key="address" />
          <Column
            title=""
            dataIndex="id"
            key="detail"
            render={(id) => {
              const customer = customers.find((customer) => customer.id === id);
              return <Link to={{ pathname: `/admin/customers_list/detail`, state: { customer } }}>詳細</Link>;
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

export default CustomersListPage;

const styles: { [key: string]: CSSProperties } = {
  container: { width: "90%", margin: "10px auto" },
  addButton: { marginBottom: 20, float: "right" },
};
