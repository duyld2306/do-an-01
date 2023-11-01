import ApiRoom, { IGetRoomsParams, IRoomRes } from "@/api/ApiRoom";
import { InputSearchGlobal } from "@/components/AntdGlobal";
import ButtonGlobal from "@/components/ButtonGlobal";
import ModalCreateEditRoom from "@/components/ModalGlobal/ModalCreateEditRoom";
import ModalUpdateRoomName from "@/components/ModalGlobal/ModalUpdateRoomName";
import TableGlobal, {
  IChangeTable,
  TABLE_DEFAULT_VALUE,
} from "@/components/TableGlobal";
import { checkPermission, groupPermission1 } from "@/lazyLoading";
import store from "@/redux/store";
import { EditOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Popover, Row, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { useState } from "react";

export default function RoomManagement() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalRoomName, setIsOpenModalRoomName] = useState(false);
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
    }
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
      title: "Tên phòng con",
      align: "center",
      render: (_, record) => {
        // const tempArray = record.roomNames?.map((item) => item.name) ?? [];
        return !record.roomNames?.length ? (
          "Trống"
        ) : (
          <ul>
            {record.roomNames.map((item) => {
              return (
                <li>
                  <Popover
                    title={
                      <ul>
                        <li>
                          Trạng thái:{" "}
                          {item.isBooking ? "Đã được dùng" : "Chưa được dùng"}
                        </li>
                        <li>
                          Ngày thêm:{" "}
                          {moment(item.createdAt).format("YYYY-MM-DD")}
                        </li>
                      </ul>
                    }
                  >
                    {item.name}
                  </Popover>
                </li>
              );
            })}
          </ul>
        );
      },
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
      render: (_, record) =>
        checkPermission(groupPermission1, store.getState().user.roles) && (
          <Space>
            <Tooltip title="Sửa tên phòng con">
              <span
                className="p-2 cursor-pointer"
                role="presentation"
                onClick={() => {
                  setRoomSelected(record);
                  setIsOpenModalRoomName(true);
                }}
              >
                <EditOutlined />
              </span>
            </Tooltip>
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
          </Space>
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
      {!!roomSelected ? (
        <ModalUpdateRoomName
          isOpenModal={isOpenModalRoomName}
          handleCloseModal={() => setIsOpenModalRoomName(false)}
          selectedRoom={roomSelected}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
