import { IRoute, PUBLIC_ROUTES } from "@/lazyLoading";
import "./index.scss";
import { Breadcrumb, Dropdown, Image, MenuProps } from "antd";
import { toggleMenu, useGetMenuState } from "@/redux/slices/MenuSlice";
import { useCallback, useMemo } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const findPath = (routes: IRoute[], path: string): IRoute[] | null => {
  for (const route of routes) {
    if (route.path === path) {
      return [route];
    }
  }
  return null;
};

interface IRenderBreadcrumbProps {
  path: string;
}

const RenderBreadcrumb = ({ path }: IRenderBreadcrumbProps) => {
  const pathArray = findPath(PUBLIC_ROUTES, path);
  if (!pathArray) {
    return null;
  }

  return (
    <Breadcrumb>
      {pathArray.map((route) => (
        <Breadcrumb.Item key={route.path}>{route.name}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

function Navbar() {
  const isOpen = useGetMenuState();
  // const user = useGetUserRedux();
  const dispatch = useDispatch();
  // const logout = useLogout();
  const location = useLocation();

  const handleToggleMenu = useCallback(() => {
    dispatch(toggleMenu());
  }, []);

  const handleGoogleLogOut = useCallback(async () => {}, []);

  const dropdownItems: MenuProps["items"] = useMemo(() => {
    return [
      {
        key: "1",
        label: "Logout",
        onClick: handleGoogleLogOut,
      },
    ];
  }, []);

  return (
    <div className="navbar">
      <div className="flex items-center">
        <span className="cursor-pointer mr-3" onClick={handleToggleMenu}>
          {isOpen ? (
            <MenuFoldOutlined style={{ fontSize: "20px" }} />
          ) : (
            <MenuUnfoldOutlined style={{ fontSize: "20px" }} />
          )}
        </span>
        <RenderBreadcrumb path={location.pathname} />
      </div>
      <Dropdown menu={{ items: dropdownItems }}>
        <div className="cursor-pointer flex items-center gap-1">
          <Image
            className="rounded-full"
            width={40}
            height={40}
            src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg"
            alt="user avatar"
            preview={false}
          />
          <span>Nguyen Van A</span>
        </div>
      </Dropdown>
    </div>
  );
}

export default Navbar;
