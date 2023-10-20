import "./index.scss";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

interface IButtonGlobal {
  className?: string;
  color?: string;
  isLoading?: boolean;
  preIcon?: React.ReactNode;
  sufIcon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function ButtonGlobal({
  className,
  color = "#bb834b",
  isLoading,
  preIcon,
  sufIcon,
  children,
  onClick,
}: IButtonGlobal) {
  return (
    <button
      className={`button-global ${className}`}
      style={{
        border: `1px solid ${color}`,
        color: color,
        padding: "6px 15px",
        fontSize: 12,
      }}
      onClick={onClick}
      disabled={isLoading}
    >
      {preIcon}
      {children}
      {sufIcon}
      {isLoading ? <LoadingOutlined className="ml-2 text-sm" spin /> : null}
    </button>
  );
}
