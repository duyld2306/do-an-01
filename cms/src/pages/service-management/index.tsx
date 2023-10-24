import ApiService, { IGetServicesParams, IServiceRes } from "@/api/ApiService";
import { InputSearchGlobal } from "@/components/AntdGlobal";
import TableGlobal, {
  IChangeTable,
  TABLE_DEFAULT_VALUE,
} from "@/components/TableGlobal";
import { useQuery } from "@tanstack/react-query";
import { Row, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";

export default function RoomManagement() {
  const [searchValue, setSearchValue] = useState("");
  const [serviceParams, setServiceParams] = useState<IGetServicesParams>({
    page: 0,
    limit: TABLE_DEFAULT_VALUE.defaultPageSize,
  });

  const { data: customers } = useQuery(
    ["get_services", serviceParams],
    () => ApiService.getServices(serviceParams),
    {
      keepPreviousData: true,
    },
  );

  const handleChangeTable = (value: IChangeTable) => {
    setServiceParams({
      ...serviceParams,
      page: value.page - 1,
      limit: value.pageSize,
    });
  };

  const columns: ColumnsType<IServiceRes> = [
    {
      title: "STT",
      align: "center",
      render: (_, __, i) => i + 1,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Đơn vị",
      dataIndex: "unity",
      align: "center",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      align: "center",
    },
  ];

  return (
    <div className="room-management-page">
      <Row className="mb-5" justify="space-between">
        <Space>
          <InputSearchGlobal
            onChange={(e) => setSearchValue(e.target.value.trim())}
            onSearch={() =>
              setServiceParams({ ...serviceParams, search: searchValue })
            }
          />
        </Space>
      </Row>
      <TableGlobal
        dataSource={customers?.results}
        columns={columns}
        onChangeTable={handleChangeTable}
      />
    </div>
  );
}
