import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";
import "antd/dist/antd.css";
import { RootState } from "../reducks/store/store";
import { deleteCustomers } from "../reducks/customers/operations";

const { Column, ColumnGroup } = Table;

const HomePage: React.FC = () => {
  const customers = useSelector((state: RootState) => state.customers);
  const dispatch = useDispatch();

  return (
    <Table
      dataSource={customers}
      style={{ width: "80%", margin: "100px auto" }}>
      <Column title="番号" dataIndex="key" key="key" />
      <ColumnGroup title="名前">
        <Column title="性" dataIndex="lastName" key="lastName" />
        <Column title="名" dataIndex="firstName" key="firstName" />
      </ColumnGroup>
      <Column title="年齢" dataIndex="age" key="age" />
      <Column title="住所" dataIndex="address" key="address" />
      <Column
        title="タグ"
        dataIndex="tags"
        key="tags"
        render={(tags: string[]) => (
          <>
            {tags.map((tag) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </>
        )}
      />
      <Column
        title=""
        dataIndex="key"
        key="detail"
        render={(key) => {
          const customer = customers.find((customer) => customer.key === key);
          return (
            <Link to={{ pathname: `/${key}`, state: { customer } }}>詳細</Link>
          );
        }}
      />
      <Column
        title=""
        dataIndex="key"
        key="delete"
        render={(key) => {
          return <a onClick={() => dispatch(deleteCustomers(key))}>削除</a>;
        }}
      />
    </Table>
  );
};

export default HomePage;
