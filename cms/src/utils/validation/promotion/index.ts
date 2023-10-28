import * as Yup from "yup";

const PromotionValidation = (type: "create" | "edit") => Yup.object().shape({});

export { PromotionValidation };
