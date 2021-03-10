import React, { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Button, Modal, Popconfirm } from "antd";
import TextField from "@material-ui/core/TextField";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ja";

import { RootState } from "../reducks/store/store";
import {
  addReservation,
  deleteReservation,
  fetchReservations,
  updateReservation,
} from "../reducks/reservations/operations";

type Event = {
  id?: number;
  user_id?: number;
  customer_id?: number;
  created_at?: Date;
  updated_at?: Date;
  title?: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
};

type EventList = Event[];

const CalendarPage: React.FC = () => {
  const reservations = useSelector((state: RootState) => state.reservations);
  const dispatch = useDispatch();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [eventList, setEventList] = useState<EventList>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const localizer = momentLocalizer(moment);
  const formats = {
    dateFormat: "D",
    dayFormat: "D(ddd)",
    monthHeaderFormat: "YYYY年M月",
    dayHeaderFormat: "M月D日(ddd)",
  };

  const openEditModal = (event: Event) => {
    setSelectedEvent(event);
    setIsEditModalVisible(true);
  };
  const closeEditModal = () => {
    setSelectedEvent(null);
    setIsEditModalVisible(false);
  };

  useEffect(() => {
    dispatch(fetchReservations());
  }, []);

  useEffect(() => {
    setEventList(
      reservations.map((reservation) => ({
        id: reservation.id,
        user_id: reservation.user_id,
        customer_id: reservation.customer_id,
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
      <EditModal
        isEditModalVisible={isEditModalVisible}
        closeEditModal={closeEditModal}
        selectedEvent={selectedEvent}
      />
      <Calendar
        localizer={localizer}
        events={eventList}
        formats={formats}
        style={{ height: 600 }}
        views={["month", "week", "day"]}
        onSelectEvent={openEditModal}
      />
      <div style={styles.createButtonContainer}>
        <Button
          type="primary"
          onClick={() => setIsEditModalVisible(true)}
          style={styles.createButton}>
          追加
        </Button>
      </div>
    </>
  );
};
export default CalendarPage;

type EditModalProps = {
  isEditModalVisible: boolean;
  closeEditModal: () => void;
  selectedEvent: Event | null;
};

const EditModal: React.FC<EditModalProps> = ({
  isEditModalVisible,
  closeEditModal,
  selectedEvent,
}) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, reset, setValue } = useForm();

  useEffect(() => {
    setValue("name", selectedEvent?.title, { shouldDirty: true });
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
          user_id: selectedEvent?.user_id,
          customer_id: selectedEvent?.customer_id,
          name: data.name,
          all_day: false,
          start_datetime: new Date(`${data.date} ${data.startTime}`),
          end_datetime: new Date(`${data.date} ${data.endTime}`),
        })
      );
    } else {
      dispatch(
        addReservation({
          name: data.name,
          all_day: false,
          start_datetime: new Date(`${data.date} ${data.startTime}`),
          end_datetime: new Date(`${data.date} ${data.endTime}`),
        })
      );
    }
    reset();
    closeEditModal();
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
              selectedEvent?.id &&
                dispatch(deleteReservation(selectedEvent?.id));
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
  );
};

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
