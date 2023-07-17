import { ReactNode, useState } from "react";
import { Layout } from "antd";
import AppMenu from "../Menu/AppMenu";
import AppHeader from "../Header/AppHeader";
const { Sider, Content } = Layout;

function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#5041BC" }}>
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          backgroundColor: "#5041BC",
          textAlign: "center",
          padding: "0 10px",
        }}
      >
        <AppMenu />
      </Sider>
      <Layout>
        <AppHeader collapsed={collapsed} toggleMenu={toggleMenu} />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            padding: 24,
            textAlign: "center",
          }}
        >
          {children}
        </Content>
      </Layout>
      <style jsx global>
        {`
          .header {
            background-color: #fff;
            border-radius: 40px 0 0 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
          }
          .ant-menu-item-selected {
            background: #fff !important;
            color: #5041bc !important;
          }
          .ant-layout {
            border-radius: 40px;
          }
          .ant-input {
            background-color: #f5f3ff;
          }
        `}
      </style>
    </Layout>
  );
}

export default AppLayout;
