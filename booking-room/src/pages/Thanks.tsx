import Helmet from "@/components/Helmet";
import { Button, Result } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Thanks() {
  const navigate = useNavigate();
  const { slug } = useParams();

  console.log(slug);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <div>
      <Helmet title="Thank you!" description="redirect your payment" />
      {slug === "success" ? (
        <Result
          status="success"
          title="Cảm ơn bạn đã đặt phòng!"
          subTitle="Chúng tôi rất mong sớm được phục vụ bạn."
          extra={[
            <Button type="primary" key="back" href="/">
              Trang chủ
            </Button>,
          ]}
        />
      ) : (
        <Result
          status="error"
          title="Đặt phòng thất bại"
          subTitle="Rất tiếc vì sự bất tiện này. Vui lòng thử lại sau."
          extra={[
            <Button type="primary" key="back" href="/">
              Trang chủ
            </Button>,
          ]}
        />
      )}
    </div>
  );
}

export default Thanks;
