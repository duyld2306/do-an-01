import ApiPromotion from "@/api/ApiPromotion";
import { useQuery } from "@tanstack/react-query";
import { Col, Image, Popover, Row } from "antd";
import moment from "moment";

export default function Promotion() {
  const { data: promotions } = useQuery(["get_promotions"], () =>
    ApiPromotion.getPromotions()
  );

  return (
    <div className="room-page">
      <div className="px-20 py-10">
        <h1 className="text-center mb-3 text-[#333] text-[1.8em] font-normal">
          KHUYẾN MẠI
        </h1>
        <div className="flex justify-center">
          <Row gutter={[16, 24]} className="w-[1200px]">
            {promotions?.results.map((item, i) => (
              <Col key={i} sm={24} md={12}>
                <div className="text-center">
                  <div className="w-full h-[400px] overflow-hidden">
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
                          Ngày kết thúc đầu:{" "}
                          {moment(item.endDate).format("DD-MM-YYYY")}
                        </li>
                        <li>Discount: {item.discount ?? 0}%</li>
                      </ul>
                    }
                  >
                    <h2
                      className="cursor-pointer text-[16px] hover:text-[#fcb134] mt-2 uppercase"
                      role="presentation"
                    >
                      {item.name || "Tên khuyến mại chờ cập nhật"}
                    </h2>
                  </Popover>
                  <p className="my-3">
                    {item.description || "Mô tả khuyến mại chờ cập nhật"}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
