import * as Yup from "yup";

const ServiceValidation = Yup.object().shape({
  name: Yup.string().trim().required("Tên dịch vụ không được để trống"),
  price: Yup.string().trim().required("Giá dịch vụ không được để trống"),
});

export { ServiceValidation };
