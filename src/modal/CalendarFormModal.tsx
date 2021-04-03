import React, { CSSProperties, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import { Button, Modal, Popconfirm } from "antd";
import { TextField, MenuItem, Select, InputLabel, FormControl } from "@material-ui/core";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ja";

import { addReservation, deleteReservation, updateReservation } from "../reducks/reservations/operations";
import { RootState } from "../reducks/store/store";
import { fetchUsers } from "../reducks/users/operations";

type Event = {
  id?: number;
  staff_id?: number;
  user_id?: number;
  created_at?: Date;
  updated_at?: Date;
  title?: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
};

type CalendarFormModalProps = {
  isEditModalVisible: boolean;
  closeEditModal: () => void;
  selectedEvent: Event | null;
};

const CalendarFormModal: React.FC<CalendarFormModalProps> = ({ isEditModalVisible, closeEditModal, selectedEvent }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, reset, setValue, control } = useForm({
    defaultValues: {
      user_id: "",
      date: moment().format("YYYY-MM-DD"),
      startTime: moment().format("HH:mm"),
      endTime: moment().add(1, "hour").format("HH:mm"),
    },
  });
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    setValue("user_id", selectedEvent?.user_id, { shouldDirty: true });
    setValue("date", moment(selectedEvent?.start).format("YYYY-MM-DD"), {
      shouldDirty: true,
    });
    setValue("startTime", moment(selectedEvent?.start).format("HH:mm"), {
      shouldDirty: true,
    });
    setValue("endTime", moment(selectedEvent?.end).format("HH:mm"), {
      shouldDirty: true,
    });
  }, [selectedEvent]);

  const onSubmit = (data) => {
    if (selectedEvent) {
      dispatch(
        updateReservation({
          id: selectedEvent?.id,
          staff_id: selectedEvent?.staff_id,
          user_id: +data.user_id,
          name: data.name,
          all_day: false,
          start_datetime: new Date(`${data.date} ${data.startTime}`),
          end_datetime: new Date(`${data.date} ${data.endTime}`),
        })
      );
    } else {
      dispatch(
        addReservation({
          user_id: +data.user_id,
          name: data.name,
          all_day: false,
          start_datetime: new Date(`${data.date} ${data.startTime}`),
          end_datetime: new Date(`${data.date} ${data.endTime}`),
        })
      );
      reset();
      closeEditModal();
    }
  };

  const onError = (data) => {
    console.log(data);
  };

  return (
    <Modal
      title={selectedEvent ? "予約編集" : "予約追加"}
      visible={isEditModalVisible}
      onCancel={() => {
        closeEditModal();
        reset();
      }}
      footer={[
        selectedEvent && (
          <Popconfirm
            key="delete"
            title="削除してもよろしいですか？"
            onConfirm={() => {
              selectedEvent?.id && dispatch(deleteReservation(selectedEvent?.id));
              reset();
              closeEditModal();
            }}
            okText="Yes"
            cancelText="No">
            <Button type="default">削除</Button>
          </Popconfirm>
        ),
        <Button form="myForm" key="submit" htmlType="submit" type="primary">
          保存
        </Button>,
      ]}>
      <form id="myForm" onSubmit={handleSubmit(onSubmit, onError)} style={styles.form}>
        <FormControl style={styles.textField}>
          <InputLabel id="users-label">顧客</InputLabel>
          <Controller
            as={
              <Select>
                <MenuItem value="">選択してください</MenuItem>
                {users?.map((user) => {
                  return (
                    <MenuItem key={user.id} value={`${user.id}`}>
                      {user.lastName} {user.firstName}
                    </MenuItem>
                  );
                })}
              </Select>
            }
            control={control}
            name="user_id"
            rules={{ required: true }}
            defaultValue={""}
          />
        </FormControl>
        {errors.user_id && <p style={styles.errors}>名前を入力してください</p>}
        <TextField
          style={styles.textField}
          name="date"
          label="日にち"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={register({ required: true })}
        />
        {errors.date && <p style={styles.errors}>日にちを入力してください</p>}
        <div>
          <TextField
            style={styles.textField}
            name="startTime"
            label="開始時刻"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            inputRef={register({ required: true })}
          />
          <TextField
            style={styles.textField}
            name="endTime"
            label="終了時刻"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            inputRef={register({ required: true })}
          />
          {(errors.startTime || errors.endTime) && <p style={styles.errors}>時刻を入力してください</p>}
        </div>
      </form>
    </Modal>
  );
};

export default CalendarFormModal;

const styles: { [key: string]: CSSProperties } = {
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  textField: {
    margin: 20,
  },
  errors: { color: "red", marginLeft: 40 },
};
