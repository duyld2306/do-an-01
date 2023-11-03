import { Tabs, TabsProps } from "antd";

export default function About() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "VỀ CHÚNG TÔI",
      children: (
        <p className="text-[12px]">
          <span className="inline-block mb-3">
            Ẩn sâu trong những dãy núi hùng vĩ ở phía bắc của Việt Nam, Sapa là
            một điểm đến khiến lòng của những người thợ du lịch bị mê hoặc bởi
            vẻ đẹp của cảnh quan tuyệt đẹp, văn hóa dân tộc đa dạng và khí hậu
            mát mẻ, thư thái. Trong số nhiều lựa chọn chỗ ở tại thị trấn xinh
            đẹp này, có một địa điểm nổi bật, là nơi lý tưởng cho những du khách
            khó tính tìm kiếm sự thoải mái, sự quyến rũ và tầm nhìn không giới
            hạn.
          </span>
          <span className="inline-block mb-3">
            <strong>1. Vị Trí Đắc Địa:</strong> Khách sạn Thanh Sơn Sapa nằm tại
            vị trí đắc địa, chỉ cách Trung tâm thị trấn Sapa và Công viên Quốc
            gia Hoàng Liên Sơn vài bước chân. Với vị trí này, bạn có thể dễ dàng
            khám phá những điểm du lịch nổi tiếng như Fansipan, thung lũng Lao
            Chải, và thác Cát Cát.
          </span>
          <span className="inline-block mb-3">
            <strong>2. Thiết Kế và Tiện Nghi Tinh Tế:</strong> Khách sạn Thanh
            Sơn Sapa đánh bại trái tim của du khách bởi thiết kế độc đáo và tiện
            nghi tinh tế. Từ các phòng nghỉ rộng rãi với cửa sổ lớn nhìn ra
            nguyên cảnh núi rừng đến những góc thư giãn sang trọng, mọi khía
            cạnh của khách sạn đều được chăm sóc kỹ lưỡng.
          </span>
          <span className="inline-block mb-3">
            <strong>3. Lễ Tân Chu Đáo:</strong> Với đội ngũ lễ tân chuyên nghiệp
            và nhiệt tình, bạn sẽ luôn cảm thấy sự chào đón và hỗ trợ tận tâm
            khi đặt chân vào Khách sạn Thanh Sơn Sapa. Họ luôn sẵn sàng giúp bạn
            với mọi yêu cầu và tạo điều kiện thuận lợi để bạn có một kỳ nghỉ
            không quên.
          </span>
          <span className="inline-block mb-3">
            <strong>4. Nhà Hàng Tinh Tế:</strong> Nhà hàng của khách sạn phục vụ
            các món ăn đa dạng, từ đặc sản địa phương đến món ăn quốc tế, đảm
            bảo rằng bạn sẽ được trải nghiệm hương vị độc đáo của Sapa. 5. Tầm
            Nhìn Hùng Vĩ:
          </span>
          <span className="inline-block mb-3">
            <strong>5. Tầm Nhìn Hùng Vĩ:</strong> Một trong những đặc điểm nổi
            bật của Khách sạn Thanh Sơn Sapa là tầm nhìn hùng vĩ mở ra từ các
            phòng nghỉ. Mỗi buổi sáng, bạn sẽ được đón thức dậy bởi cảnh sắc
            thiên nhiên tuyệt đẹp của dãy Hoàng Liên Sơn và những cánh đồng lúa
            bậc thang xanh mướt.
          </span>
          <span>
            <strong>6. Hoạt Động Thú Vị:</strong> Khách sạn cung cấp nhiều hoạt
            động thú vị như tham quan bản làng dân tộc thiểu số, leo núi
            Fansipan, hay đi dạo trong rừng nguyên sinh. Đây là cơ hội tuyệt vời
            để thấu hiểu văn hóa địa phương và khám phá thiên nhiên hoang sơ.
            Khách sạn Thanh Sơn Sapa không chỉ là một nơi lưu trú, mà còn là một
            trải nghiệm thăng hoa giữa thiên nhiên hùng vĩ và văn hóa độc đáo
            của Sapa. Nếu bạn đang tìm kiếm một địa điểm đáng nhớ cho kỳ nghỉ
            của mình, hãy cân nhắc Khách sạn Thanh Sơn Sapa để khám phá vẻ đẹp
            tuyệt vời của vùng đất này.
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
            <span>Tên tài khoản: Thanh Sơn Hotel</span>
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
