import "./index.scss";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import MainRoutes from "@/routes";

function LayoutWrapper() {
  return (
    <div className="wrapper">
      {<Header />}
      <Content>
        <MainRoutes />
      </Content>
      {<Footer />}
    </div>
  );
}

export default LayoutWrapper;
