import ApiRoom, { IGetRoomsParams, IRoomRes } from "@/api/ApiRoom";
import ButtonGlobal from "@/components/ButtonGlobal";
import ModalOrderRoom from "@/components/ModalOrderRoom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Col, Image, Row } from "antd";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Room() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [roomSelected, setRoomSelected] = useState<IRoomRes>();

  const navigate = useNavigate();
  const roomParams: IGetRoomsParams = {
    page: 0,
    limit: 4,
  };

  const {
    data: rooms,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["get_rooms", roomParams],
    ({ pageParam = 0 }) =>
      ApiRoom.getRooms({
        ...roomParams,
        page: pageParam,
      }),
    {
      getNextPageParam: (lastPage) => {
        const page = lastPage.metadata.pageNumber ?? 0;
        const total = lastPage.metadata.totalItems ?? 0;
        const limit = roomParams.limit ?? 4;
        return total > (page + 1) * limit ? page + 1 : undefined;
      },
      cacheTime: 0,
    },
  );

  const displayRooms = useMemo(() => {
    return (
      (rooms?.pages ?? [])
        .flatMap((subArray) => subArray)
        .flatMap((obj) => obj.results ?? []) ?? []
    );
  }, [rooms?.pages]);

  const openDetail = (slug: string) => {
    navigate(`/room/${slug}`);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setRoomSelected(undefined);
  };

  return (
    <div className="room-page">
      <div className="px-20 py-10">
        <h1 className="text-center mb-3 text-[#333] text-[1.8em] font-normal">
          DANH SÁCH PHÒNG
        </h1>
        <div className="flex justify-center">
          <Row gutter={[16, 24]} className="w-[1200px]">
            {displayRooms.map((item, i) => (
              <Col key={i} sm={24} md={12}>
                <div className="text-center">
                  <div className="w-full h-[400px] overflow-hidden bg-[#ccc]">
                    <Image
                      className="hover:scale-125 w-full h-[400px] object-cover transition-all duration-300 ease-out cursor-pointer"
                      src={
                        item.images?.length ?? 0 > 0
                          ? item.images?.[1]
                          : "https://www.pistachiohotel.com/UploadFile/Banner/home5.jpg"
                      }
                      preview={false}
                      onClick={() => openDetail(item.slug)}
                    />
                  </div>
                  <h2
                    className="cursor-pointer text-[16px] hover:text-[#fcb134] mt-2 uppercase"
                    role="presentation"
                    onClick={() => openDetail(item.slug)}
                  >
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
        {hasNextPage && (
          <div className="flex justify-center mt-5 cursor-pointer text-lg hover:opacity-70">
            <span role="presentation" onClick={() => fetchNextPage()}>
              Tải thêm
            </span>
          </div>
        )}
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
