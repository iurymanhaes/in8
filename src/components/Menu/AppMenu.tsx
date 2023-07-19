import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import {
  HomeOutlined,
  GithubOutlined,
  DollarOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function AppMenu() {
  const [current, setCurrent] = useState("/");
  const router = useRouter();

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Início",
    },
    {
      key: "transaction",
      icon: <DollarOutlined />,
      label: "Transações",
    },
    {
      key: "charts",
      icon: <PieChartOutlined />,
      label: "Relatórios",
    },
    {
      key: "github",
      icon: <GithubOutlined />,
      label: "Github",
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key !== "github") {
      router.push(e.key);
      setCurrent(e.key);
    } else window.open("https://github.com/iurymanhaes/in8", "_blank");
  };
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
        selectedKeys={[current]}
        style={{ backgroundColor: "#5041BC", color: "#FFF" }}
        items={menuItems}
        onClick={onClick}
      />
    </>
  );
}
