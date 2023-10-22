import "./index.scss";
import { Input } from "antd";
import { SearchProps } from "antd/lib/input";

function InputSearchGlobal({ className, ...props }: SearchProps): JSX.Element {
  return (
    <Input.Search
      allowClear
      placeholder="Tìm kiếm"
      className={`ant-search-global ${className}`}
      {...props}
    />
  );
}

export { InputSearchGlobal };
