import { Tabs, TabsProps } from "antd";

export default function About() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "VỀ CHÚNG TÔI",
      children: (
        <p className="text-[12px]">
          <span className="inline-block mb-3">
            Kết hợp nét truyền thống trong bản sắc văn hóa của các dân tộc vùng
            cao Sapa và phong cách kiến trúc châu Âu đương đại, khách sạn
            Pistachio Hotel Sapa mang đến cho du khách nghỉ dưỡng và doanh nhân
            với 106 phòng nghỉ sang trọng và tiện nghi cùng hệ thống tiện ích
            tiêu chuẩn 4 sao quốc tế.
          </span>
          <span className="inline-block mb-3">
            Nhìn từ xa, khách sạn như tòa lâu đài lộng lẫy ẩn hiện trong làn
            sương mờ ảo của phố núi. Bước chân vào khách sạn, du khách thực sự
            bị ấn tượng bởi những họa tiết hoa văn đẹp mắt trên các sản phẩm thổ
            cẩm được sử dụng làm điểm nhấn cho không gian nội thất từ các bức
            tranh treo tường, gối, thảm,… Kết hợp tông màu trầm nền nã và những
            vật dụng quen thuộc được biến tấu khác lạ, xu hướng “vinh danh bản
            sắc” đã trở thành chủ đề xuyên suốt trong thiết kế nội thất của
            khách sạn.
          </span>
          <span>
            Lựa chọn Pistachio Hotel Sapa, du khách còn được tận hưởng trọn vẹn
            các dịch vụ đẳng cấp như Bể bơi vô cực, Bể bơi 4 mùa, Phòng tập Gym,
            Quầy Bar, Dịch vụ Spa thư giãn, Phòng Karaoke, Dịch vụ hội nghị, tổ
            chức sự kiện, team building, Dịch vụ du lịch, đặt tour, Dịch vụ
            trông trẻ, Dịch vụ Y tế, Phục vụ phòng 24/24.
          </span>
        </p>
      ),
    },
    {
      key: "2",
      label: "CHÍNH SÁCH KHÁCH SẠN",
      children: (
        <div className="text-[12px]">
          <p className="flex flex-col mb-3">
            <span>Giờ nhận phòng: 14:00</span>
            <span>Giờ trả phòng: 12:00</span>
          </p>
          <strong className="inline-block mb-3">
            Chính sách Nhận – Trả phòng sớm và muộn:
          </strong>
          <p className="flex flex-col mb-3">
            <span>Nhận phòng sớm:</span>
            <span>Trước 6:00: 100% tiền phòng</span>
            <span>Sau 6:00: 50% tiền phòng (không bao gồm ăn sáng)</span>
          </p>
          <strong className="inline-block mb-3">
            Chính sách ăn sáng trẻ em và phí kê giường phụ:
          </strong>
          <p className="flex flex-col mb-3">
            <span>Dưới 5 tuổi miễn phí ăn sáng, ngủ chung</span>
            <span>Từ 6-11 tuổi: VND 300,000/ trẻ/ phòng/ đêm</span>
            <span>
              Từ 12 tuổi trở lên tính người lớn: VND 400,000/ phòng/ đêm
            </span>
            <span>
              Phí kê Giường phụ: VND 800,000/ khách (áp dụng với người lớn hoăc
              trẻ em từ 12 tuổi trở lên)
            </span>
          </p>
          <strong className="inline-block mb-3">Chính sách hủy phòng:</strong>
          <p className="inline-block mb-3">
            Tất cả các yêu cầu đặt/ hủy phòng phải được gửi bằng văn bản, fax
            hoặc thư điện tử và được khách sạn xác nhận. Sau khi nhận được xác
            nhận đặt phòng từ phía khách sạn , khách hàng phải thanh toán toàn
            bộ chi phí đăt phòng. Đặt phòng không hoàn hủy, thanh toán 100% tại
            thời điểm nhận email xác nhận đặt phòng.
          </p>
          <strong className="block mb-3">Hình thức thanh toán:</strong>
          <strong className="inline-block mb-3">
            1. Thanh toán qua chuyển khoản ngân hàng:{" "}
          </strong>
          <p className="flex flex-col mb-3">
            <span>
              Tên tài khoản: CN Công ty TNHH Đầu tư Xây dựng Đức Tuấn-KS
              Pistachio
            </span>
            <span>
              Tên ngân hàng: Ngân hàng TMCP Đầu Tư và Phát triển Việt Nam (BIDV)
              - Chi nhánh Lào Cai
            </span>
            <span>Số tài khoản: 37510006699888</span>
          </p>
          <strong>
            2. Thanh toán bằng tiền mặt hoặc quẹt thẻ tín dụng tại máy POS ở
            quầy Lễ tân khách sạn
          </strong>
        </div>
      ),
    },
  ];

  return (
    <div className="about-page">
      <div className="px-20 py-10">
        <h1 className="text-center text-[#333] text-[1.8em] font-normal mb-3">
          VỀ CHÚNG TÔI
        </h1>
        <div className="flex justify-center">
          <Tabs
            className="max-w-[1200px]"
            defaultActiveKey="1"
            items={items}
            centered
          />
        </div>
      </div>
    </div>
  );
}
