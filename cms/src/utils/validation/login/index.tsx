import * as Yup from "yup";

const LoginValidation = Yup.object().shape({
  username: Yup.string().required("Username không được để trống"),
  password: Yup.string().required("Password không được để trống"),
});

export { LoginValidation };
