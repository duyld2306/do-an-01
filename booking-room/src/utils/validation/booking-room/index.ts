import * as Yup from "yup";

const BookingRoomValidation = Yup.object().shape({
  firstName: Yup.string().trim().required("Họ tên không được để trống"),
  lastName: Yup.string().trim().required("Họ tên không được để trống"),
  email: Yup.string().trim().required("Email không được để trống"),
  tel: Yup.string().trim().required("Số điện thoại không được để trống"),
});

export { BookingRoomValidation };
