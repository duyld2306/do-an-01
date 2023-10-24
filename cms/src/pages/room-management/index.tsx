import ApiRoom, { IGetRoomsParams, IRoomRes } from "@/api/ApiRoom";
import { InputSearchGlobal } from "@/components/AntdGlobal";
import ButtonGlobal from "@/components/ButtonGlobal";
import ModalCreateEditRoom from "@/components/ModalGlobal/ModalCreateEditRoom";
import TableGlobal, {
  IChangeTable,
  TABLE_DEFAULT_VALUE,
} from "@/components/TableGlobal";
import { EditOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Row, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";

export default function RoomManagement() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [roomParams, setRoomParams] = useState<IGetRoomsParams>({
    page: 0,
    limit: TABLE_DEFAULT_VALUE.defaultPageSize,
  });
  const [roomSelected, setRoomSelected] = useState<IRoomRes>();

  const { data: rooms } = useQuery(
    ["get_rooms", roomParams],
    () => ApiRoom.getRooms(roomParams),
    {
      keepPreviousData: true,
    },
  );

  const handleCloseModal = () => {
    setRoomSelected(undefined);
    setIsOpenModal(false);
  };

  const handleChangeTable = (value: IChangeTable) => {
    setRoomParams({
      ...roomParams,
      page: value.page - 1,
      limit: value.pageSize,
    });
  };

  const columns: ColumnsType<IRoomRes> = [
    {
      title: "STT",
      align: "center",
      render: (_, __, i) => i + 1,
    },
    {
      title: "Tên phòng",
      dataIndex: "name",
      align: "center",
      width: 250,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      align: "center",
      width: 400,
    },
    {
      title: "Giá phòng (vnđ)",
      dataIndex: "price",
      align: "center",
      width: 150,
      render: (value) => value?.toLocaleString(),
    },
    {
      title: "Tiện nghi",
      align: "center",
      render: (_, record) => {
        const tempArray = record.featureRooms?.map((item) => item.name) ?? [];
        return tempArray.join(", ");
      },
    },
    {
      title: "Hành động",
      align: "center",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <span
          className="p-2 cursor-pointer"
          role="presentation"
          onClick={() => {
            setRoomSelected(record);
            setIsOpenModal(true);
          }}
        >
          <EditOutlined />
        </span>
      ),
    },
  ];

  return (
    <div className="room-management-page">
      <Row className="mb-5" justify="space-between">
        <Space>
          <InputSearchGlobal
            onChange={(e) => setSearchValue(e.target.value.trim())}
            onSearch={() =>
              setRoomParams({ ...roomParams, search: searchValue })
            }
          />
        </Space>
        <Space>
          <ButtonGlobal
            title="Thêm phòng ban"
            onClick={() => setIsOpenModal(true)}
          />
        </Space>
      </Row>
      <TableGlobal
        dataSource={rooms?.results}
        columns={columns}
        onChangeTable={handleChangeTable}
        scrollX={1200}
      />
      <ModalCreateEditRoom
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
        roomSelected={roomSelected}
      />
    </div>
  );
}
