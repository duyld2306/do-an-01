import ApiRoom, { IRoomRes } from "@/api/ApiRoom";
import "./index.scss";
import ButtonGlobal from "@/components/ButtonGlobal";
import { useQuery } from "@tanstack/react-query";
import { Carousel, Col, Image, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import ModalOrderRoom from "@/components/ModalOrderRoom";

export default function DetailRoom() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [roomSelected, setRoomSelected] = useState<IRoomRes>();

  const navigate = useNavigate();
  const { id: slug = "" } = useParams();

  const { data: room } = useQuery(
    ["get_room", slug],
    () => ApiRoom.getRoom(slug),
    { enabled: !!slug }
  );

  const { data: rooms } = useQuery(["get_rooms_1"], () => ApiRoom.getRooms());

  const displayRooms = useMemo(() => {
    return rooms?.results.filter((item) => item.slug !== slug);
  }, [rooms, slug]);

  const openDetail = (slug: string) => {
    navigate(`/room/${slug}`);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setRoomSelected(undefined);
  };

  return (
    <div className="detail-room-page">
      <div className="px-20 py-10">
        <h1 className="text-center mb-3 text-[#333] text-[1.8em] font-normal uppercase">
          {room?.name || "Tên phòng chờ cập nhật"}
        </h1>
        <div className="carousel mb-5">
          <Carousel className="w-[1000px] h-[500px] bg-[#333]" effect="fade">
            {room?.images?.map((item) => (
              <div key={item}>
                <Image
                  className="w-[1000px] h-[500px] object-cover"
                  src={
                    item ??
                    "https://www.pistachiohotel.com/UploadFile/Banner/home2.jpg"
                  }
                  preview={false}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="mx-auto text-center max-w-[1000px] mb-5">
          {room?.description || "Mô tả phòng chờ cập nhật"}
        </div>
        <div className="mx-auto text-center max-w-[1000px] mb-5">
          Giá phòng: {(room?.price ?? 0).toLocaleString()} vnđ
        </div>
        <div className="flex justify-center">
          <ButtonGlobal
            onClick={() => {
              setRoomSelected(room);
              setIsOpenModal(true);
            }}
          >
            Đặt phòng
          </ButtonGlobal>
        </div>
      </div>

      <div className="px-20 py-10">
        <h1 className="text-center mb-3 text-[#333] text-[1.8em] font-normal">
          FEATURES
        </h1>
        <div className="flex justify-center">
          <Row className="w-[1000px]">
            {room?.featureRooms?.map((item) => (
              <Col xs={24} sm={12} md={6} className="border-b">
                <span>{item.name}</span>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div className="px-20 py-10">
        <h1 className="text-center mb-3 text-[#333] text-[1.8em] font-normal">
          CÓ THỂ BẠN QUAN TÂM
        </h1>
        <div className="flex justify-center">
          <Row gutter={[16, 24]} className="w-[1200px]">
            {displayRooms?.map((item) => (
              <Col key={item.slug} sm={24} md={12}>
                <div className="text-center">
                  <div className="w-full h-[400px] overflow-hidden bg-[#ccc]">
                    <Image
                      className="hover:scale-125 w-full h-[400px] object-cover transition-all duration-300 ease-out cursor-pointer"
                      src={
                        item.images?.length ?? 0 > 0
                          ? item.images?.[0]
                          : "https://www.pistachiohotel.com/UploadFile/Banner/home5.jpg"
                      }
                      preview={false}
                      onClick={() => openDetail(item.slug)}
                    />
                  </div>
                  <h2 className="cursor-pointer text-[16px] hover:text-[#fcb134] mt-2 uppercase">
                    {item.name || "Tên phòng chờ cập nhật"}
                  </h2>
                  <p className="my-3">
                    {item.description || "Mô tả phòng chờ cập nhật"}
                  </p>
                  <div className="flex justify-center gap-3">
                    <ButtonGlobal
                      onClick={() => {
                        setRoomSelected(item);
                        setIsOpenModal(true);
                      }}
                    >
                      Đặt phòng
                    </ButtonGlobal>
                    <ButtonGlobal onClick={() => openDetail(item.slug)}>
                      Chi tiết
                    </ButtonGlobal>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      {roomSelected && (
        <ModalOrderRoom
          isOpenModal={isOpenModal}
          handleCloseModal={handleCloseModal}
          roomSelected={roomSelected}
        />
      )}
    </div>
  );
}
