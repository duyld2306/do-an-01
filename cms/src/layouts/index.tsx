import "./index.scss";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Content from "./Content";
import MainRoutes from "@/routes";
import Main from "./main";
import { useLocation, useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "@/lazyLoading";
import { useEffect } from "react";

function LayoutWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboardLayout = PUBLIC_ROUTES.find(
    (item) => item.path === location.pathname
  );

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/room-management");
    }
  }, [location.pathname]);

  return (
    <div className="wrapper">
      {isDashboardLayout ? (
        <div className="dashboard-layout">
          <Sidebar />
          <Main>
            <Navbar />
            <Content>
              <MainRoutes />
            </Content>
          </Main>
        </div>
      ) : (
        <div className="landing-layout">
          <MainRoutes />
        </div>
      )}
    </div>
  );
}

export default LayoutWrapper;
