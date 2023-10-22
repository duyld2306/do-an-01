import * as Yup from "yup";

const RoomValidation = Yup.object().shape({
  name: Yup.string().trim().required("Tên phòng không được để trống"),
  files: Yup.array()
    .required("Ảnh minh họa không được để trống")
    .min(1, "Ảnh minh họa không được để trống"),
});

export { RoomValidation };
