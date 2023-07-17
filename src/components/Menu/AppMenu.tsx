import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export default function AppMenu() {
  return (
    <>
      <h1
        style={{
          width: "100%",
          color: "#FFF",
          margin: "20px 0",
          padding: 0,
        }}
      >
        Expenses
      </h1>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ backgroundColor: "#5041BC", color: "#FFF" }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link href="/">Início</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<DollarOutlined />}>
          <Link href="/transaction">Transações</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<PieChartOutlined />}>
          <Link href="/charts">Relatórios</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}
