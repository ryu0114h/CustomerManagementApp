import React from "react";
import { useSelector } from "react-redux";
import { Table, Tag } from "antd";
import "antd/dist/antd.css";
import { RootState } from "../reducks/store/store";

const { Column, ColumnGroup } = Table;

const HomePage: React.FC = () => {
  const customers = useSelector((state: RootState) => state.customers);

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
    </Table>
  );
};

export default HomePage;
