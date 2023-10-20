import { FormProps } from "antd";
import {
  DatePicker,
  DatePickerProps,
  Form,
  FormItemProps,
  Input,
  InputProps,
  Radio,
  RadioGroupProps,
  Select,
  SelectProps,
} from "formik-antd";

function InputGlobal(props: InputProps): JSX.Element {
  const { readOnly } = props;
  return (
    <div>
      <Input
        {...props}
        className={readOnly ? "input-global-read-only" : "input-global"}
      />
    </div>
  );
}

function SelectGlobal(props: SelectProps): JSX.Element {
  return (
    <Select
      showSearch
      allowClear
      showArrow
      filterOption={(inputValue, option): boolean =>
        String(option?.label)
          ?.toLowerCase()
          ?.includes(inputValue.toLowerCase())
      }
      {...props}
    />
  );
}

function RadioGlobal(props: RadioGroupProps): JSX.Element {
  return <Radio.Group {...props} />;
}

function DatePickerGlobal(props: DatePickerProps): JSX.Element {
  return (
    <DatePicker
      style={{ width: "100%", borderRadius: 5 }}
      allowClear={false}
      format="DD-MM-YYYY"
      placeholder="dd-mm-yyyy"
      {...props}
    />
  );
}

function FormItemGlobal(props: FormItemProps): JSX.Element {
  return (
    <Form.Item hasFeedback {...props}>
      {props.children}
    </Form.Item>
  );
}

export default function FormGlobal(props: FormProps): JSX.Element {
  return <Form layout="vertical" {...props} />;
}

export {
  FormItemGlobal,
  InputGlobal,
  SelectGlobal,
  RadioGlobal,
  DatePickerGlobal,
};
