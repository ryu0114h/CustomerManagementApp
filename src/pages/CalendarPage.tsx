import React, { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Button, Modal } from "antd";
import TextField from "@material-ui/core/TextField";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ja";

import { RootState } from "../reducks/store/store";
import {
  addReservation,
  fetchReservations,
} from "../reducks/reservations/operations";

const CalendarPage: React.FC = () => {
  const reservations = useSelector((state: RootState) => state.reservations);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  type EventList = {
    id?: number;
    user_id?: number;
    customer_id?: number;
    created_at?: Date;
    updated_at?: Date;
    title?: string;
    allDay?: boolean;
    start?: Date;
    end?: Date;
  }[];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventList, setEventList] = useState<EventList>([]);
  const localizer = momentLocalizer(moment);
  const formats = {
    dateFormat: "D",
    dayFormat: "D(ddd)",
    monthHeaderFormat: "YYYY年M月",
    dayHeaderFormat: "M月D日(ddd)",
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const onSubmit = (data) => {
    dispatch(
      addReservation({
        name: data.name,
        all_day: false,
        start_datetime: new Date(`${data.date} ${data.startTime}`),
        end_datetime: new Date(`${data.date} ${data.endTime}`),
      })
    );
    setIsModalVisible(false);
  };

  const onError = (data) => {
    console.log(data);
  };

  useEffect(() => {
    dispatch(fetchReservations());
  }, []);

  useEffect(() => {
    setEventList(
      reservations.map((reservation) => ({
        id: reservation.id,
        title: reservation.name,
        allDay: reservation.all_day,
        start:
          reservation.start_datetime && new Date(reservation.start_datetime),
        end: reservation.end_datetime && new Date(reservation.end_datetime),
      }))
    );
  }, [reservations]);

  return (
    <>
      <Modal
        title="追加"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button form="myForm" key="submit" htmlType="submit" type="primary">
            Submit
          </Button>,
        ]}>
        <form
          id="myForm"
          onSubmit={handleSubmit(onSubmit, onError)}
          style={styles.form}>
          <TextField
            style={styles.textField}
            label="名前"
            name="name"
            inputRef={register({ required: true })}
          />
          {errors.name && <p style={styles.errors}>名前を入力してください</p>}
          <TextField
            style={styles.textField}
            name="date"
            label="日にち"
            type="date"
            defaultValue={moment().format("YYYY-MM-DD")}
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
              defaultValue={moment().format("HH:mm")}
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
              defaultValue={moment().add(1, "hour").format("HH:mm")}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              inputRef={register({ required: true })}
            />
            {(errors.startTime || errors.endTime) && (
              <p style={styles.errors}>時刻を入力してください</p>
            )}
          </div>
        </form>
      </Modal>
      <Calendar
        localizer={localizer}
        events={eventList}
        formats={formats}
        style={{ height: 600 }}
        views={["month", "week", "day"]}
        onSelectEvent={(event) => alert(event.title)}
      />
      <div style={styles.createButtonContainer}>
        <Button type="primary" onClick={showModal} style={styles.createButton}>
          追加
        </Button>
      </div>
    </>
  );
};
export default CalendarPage;

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
  createButtonContainer: {
    marginTop: 100,
    display: "flex",
    justifyContent: "center",
  },
  createButton: {
    width: 300,
    padding: 5,
    borderRadius: 10,
  },
};
