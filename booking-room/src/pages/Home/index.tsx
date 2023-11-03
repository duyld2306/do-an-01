import ApiService from "@/api/ApiService";
import "./index.scss";
import ButtonGlobal from "@/components/ButtonGlobal";
import { useQuery } from "@tanstack/react-query";
import { Carousel, Col, Image, Popover, Row } from "antd";
import { useNavigate } from "react-router-dom";
import ApiRoom from "@/api/ApiRoom";
import ApiPromotion from "@/api/ApiPromotion";
import moment from "moment";

export default function Hotel() {
  const navigate = useNavigate();

  const { data: services } = useQuery(["get_services"], () =>
    ApiService.getServices()
  );

  const { data: rooms } = useQuery(["get_rooms"], () =>
    ApiRoom.getRooms({ page: 0, limit: 5 })
  );

  const { data: promotions } = useQuery(["get_promotions"], () =>
    ApiPromotion.getPromotions()
  );

  const openAboutPage = () => {
    navigate("/about");
  };

  const openDetail = (slug: string) => {
    navigate(`/room/${slug}`);
  };

  return (
    <div className="home-page">
      <div className="px-20 py-10 bg-[#f5f5f5]">
        <div className="text-center mb-3">
          <h3 className="text-[19px] spac">Khách sạn Thanh sơn</h3>
          <h1 className="text-[#333] text-[1.8em] font-normal">
            ỐC ĐẢO YÊN BÌNH GIỮA LÒNG SAPA
          </h1>
        </div>
        <div className="flex gap-4 border-[10px] border-[#8679513d] p-4">
          <div className="flex-[1.5]">
            <iframe
              width="100%"
              height="450"
              src="https://www.youtube.com/embed/-AREhw2Ot3o?si=ftvtsCik7hkpWbyx"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className="flex-[1]">
            <p className="font-light">
              <span className="inline-block mb-5">
                Ẩn sâu trong những dãy núi hùng vĩ ở phía bắc của Việt Nam, Sapa
                là một điểm đến khiến lòng của những người thợ du lịch bị mê
                hoặc bởi vẻ đẹp của cảnh quan tuyệt đẹp, văn hóa dân tộc đa dạng
                và khí hậu mát mẻ, thư thái. Trong số nhiều lựa chọn chỗ ở tại
                thị trấn xinh đẹp này, có một địa điểm nổi bật, là nơi lý tưởng
                cho những du khách khó tính tìm kiếm sự thoải mái, sự quyến rũ
                và tầm nhìn không giới hạn.
              </span>
            </p>
            <ButtonGlobal className="mt-4" onClick={openAboutPage}>
              Xem chi tiết
            </ButtonGlobal>
          </div>
        </div>
      </div>

      <div className="px-20 py-10">
        <div className="text-center mb-3">
          <h3 className="text-[19px] spac">Nổi bật</h3>
          <h1 className="text-[#333] text-[1.8em] font-normal">KHUYẾN MẠI</h1>
        </div>
        <div className="flex justify-center">
          <Row gutter={[16, 24]} className="w-[1200px]">
            {promotions?.results.map((item, i) => (
              <Col key={i} sm={24} md={12} lg={8}>
                <div className="text-center">
                  <div className="w-full h-[400px] overflow-hidden bg-[#ccc]">
                    <Image
                      className="hover:scale-125 w-full h-[400px] object-cover transition-all duration-300 ease-out cursor-pointer"
                      src={
                        item.image ??
                        "https://www.pistachiohotel.com/UploadFile/Banner/home5.jpg"
                      }
                      preview={false}
                    />
                  </div>
                  <Popover
                    title={
                      <ul>
                        <li>
                          Ngày bắt đầu:{" "}
                          {moment(item.startDate).format("DD-MM-YYYY")}
                        </li>
                        <li>
                          Ngày kết thúc:{" "}
                          {moment(item.endDate).format("DD-MM-YYYY")}
                        </li>
                        <li>Discount: {item.discount ?? 0}%</li>
                      </ul>
                    }
                  >
                    <h2 className="cursor-pointer text-[16px] hover:text-[#fcb134] mt-2 uppercase">
                      {item.name ?? "Tên khuyến mại chờ cập nhật"}
                    </h2>
                  </Popover>
                  <p className="my-3">
                    {item.description ?? "Mô tả khuyến mại chờ cập nhật"}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div className="px-20 py-10 bg-[#f5f5f5]">
        <div className="text-center mb-3">
          <h3 className="text-[19px]">Khách sạn Thanh sơn</h3>
          <h1 className="text-[#333] text-[1.8em] font-normal">
            DANH SÁCH PHÒNG
          </h1>
        </div>
        <div className="carousel mb-5">
          <Carousel className="w-[1000px] h-[500px] bg-[#333]" effect="fade">
            {rooms?.results?.map((item, i) => (
              <div key={i} className="relative">
                <Image
                  className="w-[1000px] h-[500px] object-cover"
                  src={
                    item.images?.[0] ??
                    "https://www.pistachiohotel.com/UploadFile/Banner/home2.jpg"
                  }
                  preview={false}
                />
                <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center text-center text-[#fff] max-w-[400px] p-3 bg-[#0000004d]">
                  <h2
                    className="uppercase text-[#fff] font-bold cursor-pointer hover:text-[#fcb134]"
                    onClick={() => openDetail(item.slug)}
                  >
                    {item.name ?? "Tên phòng đang chờ cập nhật"}
                  </h2>
                  <p>{item.description ?? "Mô tả phòng đang chờ cập nhật"}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="px-20 py-10">
        <div className="text-center mb-3">
          <h3 className="text-[19px] spac">Nổi bật</h3>
          <h1 className="text-[#333] text-[1.8em] font-normal">
            TIỆN NGHI & DỊCH VỤ
          </h1>
        </div>
        <div className="flex justify-center">
          <Row gutter={[16, 24]} className="w-[1200px]">
            {services?.results.map((item, i) => (
              <Col key={i} md={24} lg={12} className="flex">
                <div className="w-[290px] h-[200px] overflow-hidden bg-[#ccc]">
                  <Image
                    className="w-[290px] h-[200px] object-cover hover:scale-125 transition-all duration-300 ease-out"
                    src="https://www.pistachiohotel.com/UploadFile/Banner/home5.jpg"
                    preview={false}
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 p-5 text-center ">
                  <Popover
                    title={
                      <ul>
                        <li>Đơn vị: {item.unity ?? "-"}</li>
                        <li>
                          Đơn giá: {(item.price ?? 0).toLocaleString()} vnđ
                        </li>
                      </ul>
                    }
                  >
                    <h3 className="cursor-pointer font-bold hover:text-[#bb834b]">
                      {item.name ?? "Tên dịch vụ chờ cập nhật"}
                    </h3>
                  </Popover>
                  <p className="my-3">
                    {item.description ?? "Mô tả dịch vụ chờ cập nhật"}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div className="px-20 py-10 bg-[#f5f5f5]">
        <div className="text-center mb-3">
          <h3 className="text-[19px] spac">Bản đồ</h3>
          <h1 className="text-[#333] text-[1.8em] font-normal">
            VỊ TRÍ KHÁCH SẠN
          </h1>
        </div>
        <div>
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.4580290489357!2d103.84083457619391!3d22.336327879660754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x36cd416ca288a78d%3A0x2f373ec5673d75ef!2zNDcgWHXDom4gVmnDqm4sIFRULiBTYSBQYSwgU2EgUGEsIEzDoG8gQ2FpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1699022185410!5m2!1svi!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
