import { Layout } from "antd";
import React from "react";
import ServiceContent from "../ServiceContent/ServiceContent";
import "./Content.css";

const { Content } = Layout;

const ContentPage = () => {
  return (
    <Layout className="layout">
      <Content style={{ padding: "5vh 10vw" }}>
        <div className="site-layout-content">
            <ServiceContent />
        </div>
      </Content>
    </Layout>
  );
};

export default ContentPage;
