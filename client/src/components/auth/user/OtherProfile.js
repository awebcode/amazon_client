import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Button, Divider, Tabs } from "antd";
import {
  UserOutlined,
  LikeOutlined,
  DislikeOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import axios from "axios";

// Import your CSS file for custom styling

const { TabPane } = Tabs;

const OtherProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/user/single-user/${id}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [id]);

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div
        className="h-64 bg-cover bg-center w-full"
        style={{ backgroundImage: "url('/carousel/4.jpg')" }}
      ></div>
      <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:w-[70%] mx-auto mt-4">
        <Avatar
          size={150}
          icon={<UserOutlined />}
          src={userData?.avatar?.url}
          className="mb-4 md:my-[-140px] md:ring-2 md:bg-white"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold">{userData?.name}</h2>
          <h4 className="text-gray-500">{userData?.email}</h4>
          <h4 className="text-gray-500">{userData?.phone}</h4>
          <Divider />
        </div>
      </div>
      <div className="content px-4 py-1 w-full md:w-[70%] mx-auto mt-4">
        <div className="flex justify-center flex-wrap space-x-4 mt-4 md:flex-nowrap">
          <Button
            type="primary"
            icon={<LikeOutlined />}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Like
          </Button>
          <Button
            type="primary"
            icon={<DislikeOutlined />}
            className="bg-red-500 hover:bg-red-600"
          >
            Dislike
          </Button>
          <Button type="default" className="bg-gray-300 hover:bg-gray-400">
            <MessageOutlined />
            Message
          </Button>
          <Button type="primary" className="bg-green-500 hover:bg-green-600">
            Follow
          </Button>
        </div>

        <Tabs className="mt-4" defaultActiveKey="followers">
          <TabPane tab={`Followers`} key="followers">
            No Followers Yet.
          </TabPane>
          <TabPane tab={`Following`} key="following">
            No Following Yet.
          </TabPane>
          <TabPane tab={`Likes`} key="likes">
            No Likes Yet.
          </TabPane>
        </Tabs>

        <div className="tabs-content mt-4">
          <Tabs defaultActiveKey="reviews">
            <TabPane tab="Reviews" key="reviews">
              No Reviews Yet.
            </TabPane>
            <TabPane tab="Posts" key="posts">
              No Posts Yet.
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;
