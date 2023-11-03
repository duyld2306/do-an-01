import { Link } from "react-router-dom";
import "./index.scss";
import { PUBLIC_ROUTES } from "@/lazyLoading";
import { useEffect, useState } from "react";
import { Carousel, Image } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const [active, setActive] = useState(window.location.pathname);
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    setActive(window.location.pathname);
  }, [window.location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY >= 50;
      if (isScrolled !== isScroll) {
        setIsScroll(!isScroll);
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [isScroll]);

  return (
    <header className="header">
      <Carousel autoplay autoplaySpeed={3000} effect="fade">
        <div>
          <Image
            src="https://www.pistachiohotel.com/UploadFile/Banner/home2.jpg"
            preview={false}
          />
        </div>
        <div>
          <Image
            src="https://www.pistachiohotel.com/UploadFile/Banner/home4.jpg"
            preview={false}
          />
        </div>
        <div>
          <Image
            src="https://www.pistachiohotel.com/UploadFile/Banner/home5.jpg"
            preview={false}
          />
        </div>
        <Image
          src="https://www.pistachiohotel.com/UploadFile/Banner/home6.jpg"
          preview={false}
        />
      </Carousel>
      <ul
        className={`nav-list flex justify-center items-center p-3 w-full relative ${
          isScroll && "scrolled"
        }`}
      >
        {PUBLIC_ROUTES.map(
          (route) =>
            route.name && (
              <li
                key={route.path}
                className={`nav-item ${route.path === active && "active"}`}
              >
                <Link to={route.path} onClick={() => setActive(route.path)}>
                  {route.name}
                </Link>
              </li>
            ),
        )}
        {isFetching + isMutating > 0 && (
          <span className="absolute top-1/2 transform -translate-y-1/2 right-[5px] flex item-center text-2xl text-white">
            <SyncOutlined spin />
          </span>
        )}
      </ul>
    </header>
  );
}

export default Header;
