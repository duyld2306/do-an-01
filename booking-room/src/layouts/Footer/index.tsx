import "./index.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="">
        <p className="mb-3">
          <strong>Địa chỉ:</strong> Số 29, tổ 5, đường Thác Bạc, Phường Sapa,
          Thị xã Sapa, tỉnh Lào Cai, Việt Nam
        </p>
        <p className="flex gap-4 mb-3">
          <span>
            <strong>Điện thoại:</strong>{" "}
            <a
              className="hover:text-[#fcb134]"
              href="tel:0214 356 6666"
              target="_blank"
            >
              0214 356 6666
            </a>
          </span>
          <span>
            <strong>Hotline:</strong>{" "}
            <a
              className="hover:text-[#fcb134]"
              href="tel:0868 588 364"
              target="_blank"
            >
              0868 588 364
            </a>
          </span>
          <span>
            <strong>Email:</strong>{" "}
            <a
              className="hover:text-[#fcb134]"
              href="mailto:rsv@pistachiohotel.com"
              target="_blank"
            >
              rsv@pistachiohotel.com
            </a>
          </span>
        </p>
      </div>
      <p>© Bản quyền 2020 - 2025 bởi Pistachio Hotel Sapa</p>
    </footer>
  );
}

export default Footer;
