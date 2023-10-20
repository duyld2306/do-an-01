import ButtonGlobal from "@/components/ButtonGlobal";
import ModalOrderRoom from "@/components/ModalOrderRoom";
import { Col, Image, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Room() {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openDetail = () => {
    navigate("/room/1");
  };

  const openModalOrder = () => {
    setIsOpenModal(true);
  };

  const onclose = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="room-page">
      <div className="px-20 py-10">
        <h1 className="text-center mb-3 text-[#333] text-[1.8em] font-normal">
          DANH SÁCH PHÒNG
        </h1>
        <div className="flex justify-center">
          <Row gutter={[16, 24]} className="w-[1200px]">
            <Col sm={24} md={12}>
              <div className="text-center">
                <div className="w-full h-[400px] overflow-hidden">
                  <Image
                    className="hover:scale-125 w-full h-[400px] object-cover transition-all duration-300 ease-out cursor-pointer"
                    src="https://www.pistachiohotel.com/UploadFile/Banner/home5.jpg"
                    preview={false}
                    onClick={openDetail}
                  />
                </div>
                <h2 className="cursor-pointer text-[16px] hover:text-[#fcb134] mt-2">
                  PHÒNG SUPERIOR - HƯỚNG THỊ XÃ
                </h2>
                <p className="my-3">
                  Sở hữu diện tích 38m2, phòng Superior hướng thị xã ấm cúng
                  nhưng không kém phần trang nhã với 1 giường lớn, ghế sofa
                  phòng khách, tivi, bàn làm việc kết hợp trang điểm, tủ quần
                  áo, phòng tắm hiện...
                </p>
                <div className="flex justify-center gap-3">
                  <ButtonGlobal onClick={openModalOrder}>
                    Đặt phòng
                  </ButtonGlobal>
                  <ButtonGlobal onClick={openDetail}>Chi tiết</ButtonGlobal>
                </div>
              </div>
            </Col>
            <Col sm={24} md={12}>
              <div className="text-center">
                <div className="w-full h-[400px] overflow-hidden">
                  <Image
                    className="hover:scale-125 w-full h-[400px] object-cover transition-all duration-300 ease-out"
                    src="https://www.pistachiohotel.com/UploadFile/Banner/home5.jpg"
                    preview={false}
                  />
                </div>
                <h2 className="cursor-pointer text-[16px] hover:text-[#fcb134] mt-2">
                  PHÒNG SUPERIOR - HƯỚNG THỊ XÃ
                </h2>
                <p className="my-3">
                  Sở hữu diện tích 38m2, phòng Superior hướng thị xã ấm cúng
                  nhưng không kém phần trang nhã với 1 giường lớn, ghế sofa
                  phòng khách, tivi, bàn làm việc kết hợp trang điểm, tủ quần
                  áo, phòng tắm hiện...
                </p>
                <div className="flex justify-center gap-3">
                  <ButtonGlobal>Đặt phòng</ButtonGlobal>
                  <ButtonGlobal>Chi tiết</ButtonGlobal>
                </div>
              </div>
            </Col>
            <Col sm={24} md={12}>
              <div className="text-center">
                <div className="w-full h-[400px] overflow-hidden">
                  <Image
                    className="hover:scale-125 w-full h-[400px] object-cover transition-all duration-300 ease-out"
                    src="https://www.pistachiohotel.com/UploadFile/Banner/home5.jpg"
                    preview={false}
                  />
                </div>
                <h2 className="cursor-pointer text-[16px] hover:text-[#fcb134] mt-2">
                  PHÒNG SUPERIOR - HƯỚNG THỊ XÃ
                </h2>
                <p className="my-3">
                  Sở hữu diện tích 38m2, phòng Superior hướng thị xã ấm cúng
                  nhưng không kém phần trang nhã với 1 giường lớn, ghế sofa
                  phòng khách, tivi, bàn làm việc kết hợp trang điểm, tủ quần
                  áo, phòng tắm hiện...
                </p>
                <div className="flex justify-center gap-3">
                  <ButtonGlobal>Đặt phòng</ButtonGlobal>
                  <ButtonGlobal>Chi tiết</ButtonGlobal>
                </div>
              </div>
            </Col>
            <Col sm={24} md={12}>
              <div className="text-center">
                <div className="w-full h-[400px] overflow-hidden">
                  <Image
                    className="hover:scale-125 w-full h-[400px] object-cover transition-all duration-300 ease-out"
                    src="https://www.pistachiohotel.com/UploadFile/Banner/home5.jpg"
                    preview={false}
                  />
                </div>
                <h2 className="cursor-pointer text-[16px] hover:text-[#fcb134] mt-2">
                  PHÒNG SUPERIOR - HƯỚNG THỊ XÃ
                </h2>
                <p className="my-3">
                  Sở hữu diện tích 38m2, phòng Superior hướng thị xã ấm cúng
                  nhưng không kém phần trang nhã với 1 giường lớn, ghế sofa
                  phòng khách, tivi, bàn làm việc kết hợp trang điểm, tủ quần
                  áo, phòng tắm hiện...
                </p>
                <div className="flex justify-center gap-3">
                  <ButtonGlobal>Đặt phòng</ButtonGlobal>
                  <ButtonGlobal>Chi tiết</ButtonGlobal>
                </div>
              </div>
            </Col>
          </Row>
          <ModalOrderRoom isOpenModal={isOpenModal} onclose={onclose} />
        </div>
      </div>
    </div>
  );
}
