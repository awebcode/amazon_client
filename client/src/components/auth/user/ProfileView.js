import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "antd";

import OtherProfile from "./OtherProfile";

const { Content } = Layout;

const ProfilePage = () => {
  const { id } = useParams();

  return (
    <Layout className="min-h-screen">
      <Content className="p-8">
        <OtherProfile id={id} />
      </Content>
    </Layout>
  );
};

export default ProfilePage;
