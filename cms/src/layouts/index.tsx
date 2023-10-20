import "./index.scss";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Content from "./Content";
import MainRoutes from "@/routes";

function LayoutWrapper() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div>
        <Navbar />
        <Content>
          <MainRoutes />
        </Content>
      </div>
    </div>
  );
}

export default LayoutWrapper;
