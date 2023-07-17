import React from "react";
import { Button, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Statement } from "typescript";

const { Header } = Layout;

type Props = {
  toggleMenu: () => void;
  collapsed: boolean;
};

export default function AppHeader({ toggleMenu, collapsed }: Props) {
  return (
    <Header className="header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          onClick={toggleMenu}
          style={{
            marginLeft: 16,
            backgroundColor: "#5041BC",
            color: "#FFF",
          }}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      </div>
    </Header>
  );
}
