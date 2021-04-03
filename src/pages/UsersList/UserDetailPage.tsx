import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, notification, Popconfirm } from "antd";
import { deleteUser } from "../../reducks/users/operations";
import { RootState } from "../../reducks/store/store";
import { UsersListPageRouteComponentProps } from "../../routes";

const UserDetailPage: React.FC<UsersListPageRouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.find((u) => u.id === props.location.state.user.id));

  const alertConfirm = () => {
    if (user) {
      dispatch(deleteUser(user.id));
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
      {user && (
        <>
          <Card title={`${user.lastName} ${user.firstName} さんの情報`} style={styles.card}>
            <p style={styles.p}>
              番号 <span style={styles.value}>{user.id}</span>
            </p>
            <p style={styles.p}>
              名前{" "}
              <span style={styles.value}>
                {user.lastName} {user.firstName}
              </span>
            </p>
            <p style={styles.p}></p>
            <p style={styles.p}>
              住所 <span style={styles.value}>{user.address}</span>
            </p>
            <p style={styles.p}>
              年齢 <span style={styles.value}>{user.age}</span>
            </p>
            {user.memo && (
              <p style={styles.p}>
                メモ <span style={styles.value}>{user.memo}</span>
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
                pathname: `/admin/users_list/edit`,
                state: { user: user },
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

export default UserDetailPage;

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
