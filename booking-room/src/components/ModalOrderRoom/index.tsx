import { useRef } from "react";
import { Formik, FormikProps } from "formik";
import { Col, Divider, Image, Row, Tabs, TabsProps } from "antd";
import FormGlobal, {
  DatePickerFormikGlobal,
  FormItemGlobal,
  InputFormikGlobal,
  InputNumberFormikGlobal,
  RadioGroupFormikGlobal,
  SelectFormikGlobal,
} from "../FormGlobal";
import ModalGlobal from "../ModalGlobal";
import moment, { Moment } from "moment";
import ApiRoom, { IBookRoomBody, IRoomRes } from "@/api/ApiRoom";
import { useMutation } from "@tanstack/react-query";
import Notification from "../Notification";
import { BookingRoomValidation } from "@/utils/validation/booking-room";
import { REG_EMAIL } from "@/utils/validation/booking-room/reg";

interface IRoomValue {
  firstName: string;
  lastName: string;
  sex: string;
  email: string;
  tel: string;
  checkin: Moment;
  checkout: Moment;
  idRoom: string;
  paymentType: string;
  quantity: number;
}

interface IModalOrderRoomProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  roomSelected: IRoomRes;
}
export default function ModalOrderRoom({
  isOpenModal,
  handleCloseModal,
  roomSelected,
}: IModalOrderRoomProps) {
  const innerRef = useRef<FormikProps<IRoomValue>>(null);

  const initialValues: IRoomValue = {
    firstName: "",
    lastName: "",
    sex: "male",
    email: "",
    tel: "",
    checkin: moment().startOf("day"),
    checkout: moment().startOf("day").add(1, "day"),
    idRoom: roomSelected.id,
    paymentType: "Momo",
    quantity: 1,
  };

  const onCancel = () => {
    innerRef.current?.resetForm();
    handleCloseModal();
  };

  const calculateNight = (sd: Moment, ed: Moment) => {
    return (
      ed.diff(sd, "days") *
      (roomSelected.price ?? 0) *
      (innerRef.current?.values.quantity ?? 0)
    ).toLocaleString();
  };

  const bookRoomMutation = useMutation(ApiRoom.bookRoom);
  const handleSubmit = (values: IRoomValue) => {
    const newValues: IBookRoomBody = {
      ...values,
      checkin: values.checkin.format("YYYY-MM-DD"),
      checkout: values.checkout.format("YYYY-MM-DD"),
    };
    bookRoomMutation.mutate(newValues, {
      onSuccess: (response) => {
        Notification.notificationSuccess("Vui lòng hoàn tất thủ tục đặt phòng");
        window.open(response, "_blank");
        onCancel();
      },
    });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Mô tả",
      children: (
        <p className="inline-block mb-2">
          {roomSelected.description ?? "Mô tả đang chờ cập nhật"}
        </p>
      ),
    },
    {
      key: "2",
      label: "Tiện nghi",
      children: (
        <ul>
          {roomSelected.featureRooms?.map((item) => <li>{item.name}</li>)}
        </ul>
      ),
    },
    {
      key: "3",
      label: "Hình ảnh",
      children: (
        <div className="flex flex-wrap gap-2">
          {roomSelected.images?.map((item) => (
            <Image width={100} height={100} src={item} preview={false} />
          ))}
        </div>
      ),
    },
    {
      key: "4",
      label: "Chính sách Check-in/Check-out",
      children: (
        <div className="flex flex-col">
          <span>Check-In: 2:00 PM</span>
          <span>Check-Out: 12:00 PM</span>
          <span>Late Check-out Hour: 5:30 PM</span>
          <span>Late Check-out Fees: 100%</span>
          <span>
            Late check-out (after 12:00 PM and before 5:30 PM) may result in a
            fee.
          </span>
        </div>
      ),
    },
  ];

  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={BookingRoomValidation}
    >
      {(formikProps): JSX.Element => {
        return (
          <ModalGlobal
            open={isOpenModal}
            title="Đặt phòng"
            onOk={formikProps.handleSubmit}
            onCancel={onCancel}
            isLoadingOK={bookRoomMutation.isLoading}
          >
            <FormGlobal>
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <div className="font-bold">
                    {roomSelected.name ?? "Tên đang chờ cập nhật"}
                  </div>
                  <div>
                    Giá: {(roomSelected.price ?? 0).toLocaleString()}{" "}
                    <span>vnđ - 1 đêm</span>
                  </div>
                  <Tabs
                    className="max-w-[1200px]"
                    defaultActiveKey="1"
                    items={items}
                  />
                </Col>
                <Col span={12}>
                  <Row gutter={[8, 0]}>
                    <Col span={12}>
                      <FormItemGlobal name="lastName" label="Họ" required>
                        <InputFormikGlobal name="lastName" placeholder="Họ" />
                      </FormItemGlobal>
                      <FormItemGlobal
                        name="email"
                        label="Email"
                        required
                        rules={[
                          {
                            pattern: REG_EMAIL,
                            message: "Email không đúng định dạng",
                          },
                        ]}
                      >
                        <InputFormikGlobal name="email" placeholder="Email" />
                      </FormItemGlobal>
                      <FormItemGlobal name="sex" label="Giới tính" required>
                        <SelectFormikGlobal
                          name="sex"
                          placeholder="Giới tính"
                          options={[
                            { label: "Nam", value: "male" },
                            { label: "Nữ", value: "female" },
                          ]}
                        />
                      </FormItemGlobal>
                    </Col>
                    <Col span={12}>
                      <FormItemGlobal name="firstName" label="Tên" required>
                        <InputFormikGlobal name="firstName" placeholder="Tên" />
                      </FormItemGlobal>
                      <FormItemGlobal name="tel" label="Số điện thoại" required>
                        <InputFormikGlobal
                          name="tel"
                          placeholder="Số điện thoại"
                        />
                      </FormItemGlobal>
                      <FormItemGlobal name="quantity" label="quantity" required>
                        <InputNumberFormikGlobal
                          name="quantity"
                          placeholder="Số lượng"
                          min={1}
                        />
                      </FormItemGlobal>
                    </Col>
                  </Row>
                  <Row gutter={[8, 0]}>
                    <Col span={12}>
                      <FormItemGlobal name="checkin" label="Check-in" required>
                        <DatePickerFormikGlobal
                          name="checkin"
                          allowClear={false}
                          disabledDate={(d) =>
                            d <= moment().subtract(1, "days") ||
                            d >= formikProps.values.checkout
                          }
                          onChange={(date) => {
                            formikProps.setFieldValue(
                              "checkin",
                              date?.startOf("day")
                            );
                          }}
                        />
                      </FormItemGlobal>
                    </Col>
                    <Col span={12}>
                      <FormItemGlobal
                        name="checkout"
                        label="Check-out"
                        required
                      >
                        <DatePickerFormikGlobal
                          name="checkout"
                          allowClear={false}
                          disabledDate={(d) => d <= formikProps.values.checkin}
                          onChange={(date) => {
                            formikProps.setFieldValue(
                              "checkout",
                              date?.startOf("day")
                            );
                          }}
                        />
                      </FormItemGlobal>
                    </Col>
                  </Row>
                  <span className="font-bold">
                    Số tiền thanh toán:{" "}
                    {calculateNight(
                      formikProps.values.checkin,
                      formikProps.values.checkout
                    )}{" "}
                    VNĐ
                  </span>
                  <Divider />
                  <div className="mt-5">
                    <span className="font-bold">Phương thức thanh toán</span>
                    <FormItemGlobal name="paymentType" required>
                      <RadioGroupFormikGlobal
                        name="paymentType"
                        options={[
                          { label: "Momo", value: "Momo" },
                          { label: "Vnpay", value: "Vnpay" },
                          { label: "Zalopay", value: "Zalopay" },
                        ]}
                      />
                    </FormItemGlobal>
                  </div>
                </Col>
              </Row>
            </FormGlobal>
          </ModalGlobal>
        );
      }}
    </Formik>
  );
}
