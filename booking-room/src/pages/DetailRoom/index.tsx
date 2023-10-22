import ApiRoom from "@/api/ApiRoom";
import "./index.scss";
import ButtonGlobal from "@/components/ButtonGlobal";
import { useQuery } from "@tanstack/react-query";
import { Carousel, Col, Image, Popover, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailRoom() {
  const navigate = useNavigate();
  const { id: slug = "" } = useParams();

  const { data: room } = useQuery(
    ["get_room", slug],
    () => ApiRoom.getRoom(slug),
    { enabled: !!slug },
  );

  console.log(room);

  const openDetail = () => {
    navigate("/room/1");
  };

  return (
    <div className="detail-room-page">
      <div className="px-20 py-10">
        <Popover
          trigger="hover"
          placement="bottom"
          title={
            <div className="z-[1000] p-5 bg-[#f5f5f5]">
              <div className="mb-3">
                <i className="fas fa-map-marker-alt fa-fw lh-body mr-2"></i>
                <span>Vị trí phòng: 2, 8 đến tầng 11</span>
              </div>
              <div className="mb-3">
                <i className="fas fa-map-marker-alt fa-fw lh-body mr-2"></i>
                <span>Room size: 38m2</span>
              </div>
              <div className="mb-3">
                <i className="fas fa-map-marker-alt fa-fw lh-body mr-2"></i>
                <span>Giường: 01 giường đôi hoặc 02 giường đơn</span>
              </div>
              <div>
                <i className="fas fa-map-marker-alt fa-fw lh-body mr-2"></i>
                <span>Số lượng phòng: 9 phòng</span>
              </div>
            </div>
          }
        >
          <h1 className="text-center mb-3 text-[#333] text-[1.8em] font-normal uppercase">
            {room?.name || "Tên phòng chờ cập nhật"}
          </h1>
        </Popover>
        <div className="carousel mb-5">
          <Carousel
            className="max-w-[1000px] h-[500px] bg-[#333]"
            effect="fade"
          >
            {(room?.images?.length ?? 0) > 0 &&
              room?.images?.map((item, i) => (
                <div key={i}>
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
        <div className="flex justify-center">
          <ButtonGlobal>Đặt phòng</ButtonGlobal>
        </div>
      </div>

      <div className="px-20 py-10">
        <h1 className="text-center mb-3 text-[#333] text-[1.8em] font-normal">
          FEATURES
        </h1>
        <div className="flex justify-center">
          <Row className="w-[1000px]">
            <Col xs={24} sm={12} md={6} className="border-b">
              <span>Điều hòa 2 chiều</span>
            </Col>
            <Col xs={24} sm={12} md={6} className="border-b">
              <span>Điều hòa 2 chiều</span>
            </Col>
            <Col xs={24} sm={12} md={6} className="border-b">
              <span>Điều hòa 2 chiều</span>
            </Col>
            <Col xs={24} sm={12} md={6} className="border-b">
              <span>Điều hòa 2 chiều</span>
            </Col>
            <Col xs={24} sm={12} md={6} className="border-b">
              <span>Điều hòa 2 chiều</span>
            </Col>
            <Col xs={24} sm={12} md={6} className="border-b">
              <span>Điều hòa 2 chiều</span>
            </Col>
            <Col xs={24} sm={12} md={6} className="border-b">
              <span>Điều hòa 2 chiều</span>
            </Col>
            <Col xs={24} sm={12} md={6} className="border-b">
              <span>Điều hòa 2 chiều</span>
            </Col>
            <Col xs={24} sm={12} md={6} className="border-b">
              <span>Điều hòa 2 chiều</span>
            </Col>
            <Col xs={24} sm={12} md={6} className="border-b">
              <span>Điều hòa 2 chiều</span>
            </Col>
            <Col xs={24} sm={12} md={6} className="border-b">
              <span>Điều hòa 2 chiều</span>
            </Col>
            <Col xs={24} sm={12} md={6} className="border-b">
              <span>Điều hòa 2 chiều</span>
            </Col>
            <Col xs={24} sm={12} md={6} className="border-b">
              <span>Điều hòa 2 chiều</span>
            </Col>
          </Row>
        </div>
      </div>

      <div className="px-20 py-10">
        <h1 className="text-center mb-3 text-[#333] text-[1.8em] font-normal">
          CÓ THỂ BẠN QUAN TÂM
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
                  <ButtonGlobal>Đặt phòng</ButtonGlobal>
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
        </div>
      </div>
    </div>
  );
}
