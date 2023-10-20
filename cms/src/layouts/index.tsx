import "./index.scss";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Content from "./Content";
import MainRoutes from "@/routes";
import Main from "./main";

function LayoutWrapper() {
  return (
    <div className="wrapper">
      <Sidebar />
      <Main>
        <Navbar />
        <Content>
          <MainRoutes />
        </Content>
      </Main>
    </div>
  );
}

export default LayoutWrapper;
