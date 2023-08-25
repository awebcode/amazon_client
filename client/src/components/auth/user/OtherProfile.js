import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Card, Spin, Button, Divider, Upload } from "antd";
import {
  UserOutlined,
  LikeOutlined,
  DislikeOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import axios from "axios";

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
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <Spin size="large" />
      ) : (
        <Card className="w-96 p-4 border-2 border-gray-300 rounded-lg shadow-md">
          <div className="text-center">
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false}
              disabled
              //   onChange={handleAvatarChange}
            >
              <Avatar
                size={100}
                icon={<UserOutlined />}
                src={userData?.avatar?.url}
                className="mb-4"
              />
            </Upload>

            <h2 className="text-xl font-semibold">{userData?.name}</h2>
            <h4 className="text-gray-500">{userData?.email}</h4>
            <h4 className="text-gray-500">{userData?.phone}</h4>
            <Divider />
            <Button
              type="primary"
              icon={<LikeOutlined />}
              className="m-2 bg-blue-500 hover:bg-blue-600"
            >
              Like
            </Button>
            <Button
              type="primary"
              icon={<DislikeOutlined />}
              className="m-2  bg-red-500 hover:bg-red-600"
            >
              Dislike
            </Button>
            <Button type="default" className="m-2 bg-gray-300 hover:bg-gray-400">
              <MessageOutlined />
              Message
            </Button>
            <Button type="primary" className="bg-green-500 hover:bg-green-600">
              Follow
            </Button>
            <Divider />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold mr-2">Followers</h3>
                <span className="text-gray-500">(3456)</span>
              </div>
              <div className="flex items-center">
                <h3 className="text-lg font-semibold mr-2">Following</h3>
                <span className="text-gray-500">(30)</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Likes</h3>
              <span className="text-gray-500">(16,534,530)</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default OtherProfile;
