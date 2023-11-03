import "./index.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="flex flex-col items-center">
        <p className="mb-3">
          <strong>Địa chỉ:</strong> 047A Xuân Viên, Phường Sa Pa, Thị xã Sa Pa,
          Tỉnh Lào Cai, Việt Nam
        </p>
        <p className="flex gap-4 mb-3">
          <span>
            <strong>Điện thoại:</strong>{" "}
            <a
              className="hover:text-[#fcb134]"
              href="tel:02143 666 6888"
              target="_blank"
            >
              02143 666 6888
            </a>
          </span>
          <span>
            <strong>Hotline:</strong>{" "}
            <a
              className="hover:text-[#fcb134]"
              href="tel:0914 605 658"
              target="_blank"
            >
              0914 605 658
            </a>
          </span>
          <span>
            <strong>Email:</strong>{" "}
            <a
              className="hover:text-[#fcb134]"
              href="mailto:rsv@thanhsonhotel.com"
              target="_blank"
            >
              rsv@thanhsonhotel.com
            </a>
          </span>
        </p>
      </div>
      <p>© Bản quyền 2023 - 2028 bởi Thanh Son Hotel Sapa</p>
    </footer>
  );
}

export default Footer;
