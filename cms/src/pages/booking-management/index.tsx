import ApiBookRoom, {
  IBookingRes,
  IGetBookingsParams,
} from "@/api/ApiBookRoom";
import { InputSearchGlobal } from "@/components/AntdGlobal";
import TableGlobal, {
  IChangeTable,
  TABLE_DEFAULT_VALUE,
} from "@/components/TableGlobal";
import { useQuery } from "@tanstack/react-query";
import { Row, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { useState } from "react";

export default function RoomManagement() {
  const [searchValue, setSearchValue] = useState("");
  const [bookingParams, setBookingParams] = useState<IGetBookingsParams>({
    page: 0,
    limit: TABLE_DEFAULT_VALUE.defaultPageSize,
  });

  const { data: customers } = useQuery(
    ["get_bookings", bookingParams],
    () => ApiBookRoom.getBookings(bookingParams),
    {
      keepPreviousData: true,
    },
  );

  const handleChangeTable = (value: IChangeTable) => {
    setBookingParams({
      ...bookingParams,
      page: value.page - 1,
      limit: value.pageSize,
    });
  };

  const columns: ColumnsType<IBookingRes> = [
    {
      title: "STT",
      align: "center",
      render: (_, __, i) => i + 1,
    },
    {
      title: "Tên khách hàng",
      dataIndex: ["client", "name"],
      align: "center",
    },
    {
      title: "email",
      dataIndex: ["client", "email"],
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: ["client", "tel"],
      align: "center",
    },
    {
      title: "Ngày check-in",
      align: "center",
      render: (_, record) => moment(record.checkin).format("DD-MM-YYYY"),
    },
    {
      title: "Ngày check-out",
      align: "center",
      render: (_, record) => moment(record.checkout).format("DD-MM-YYYY"),
    },
  ];

  return (
    <div className="room-management-page">
      <Row className="mb-5" justify="space-between">
        <Space>
          <InputSearchGlobal
            onChange={(e) => setSearchValue(e.target.value.trim())}
            onSearch={() =>
              setBookingParams({ ...bookingParams, search: searchValue })
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
