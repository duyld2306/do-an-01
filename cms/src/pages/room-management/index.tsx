import ApiRoom from "@/api/ApiRoom";
import ButtonGlobal from "@/components/ButtonGlobal";
import ModalCreateEditRoom from "@/components/ModalGlobal/ModalCreateEditRoom";
import TableGlobal from "@/components/TableGlobal";
import { useQuery } from "@tanstack/react-query";
import { Row, Space } from "antd";
import { useState } from "react";

export default function RoomManagement() {
  const { data: rooms } = useQuery(["get_rooms"], () => ApiRoom.getRooms());
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="room-management-page">
      <Row className="mb-5" justify="end">
        <Space>
          <ButtonGlobal
            title="Thêm phòng ban"
            onClick={() => setIsOpenModal(true)}
          />
        </Space>
      </Row>
      <TableGlobal dataSource={rooms?.results} columns={[]} />
      <ModalCreateEditRoom
        isOpenModal={isOpenModal}
        onclose={handleCloseModal}
      />
    </div>
  );
}
