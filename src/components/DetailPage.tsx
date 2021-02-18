import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { Card, Tag } from "antd";
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
              <Link
                onClick={() => dispatch(deleteCustomers(customer.key))}
                to={`/`}
                style={{ margin: 10 }}>
                削除
              </Link>
            </div>
          }
          style={{ width: 500, margin: "100px auto" }}>
          <p>番号 : {customer.key}</p>
          <p>
            名前 : {customer.lastName} {customer.firstName}
          </p>
          <p>年齢 : {customer.age}</p>
          <p>住所 : {customer.address}</p>
          <p>
            タグ :{" "}
            {customer.tags.map((tag) => (
              <Tag color="blue" key={tag}>
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
