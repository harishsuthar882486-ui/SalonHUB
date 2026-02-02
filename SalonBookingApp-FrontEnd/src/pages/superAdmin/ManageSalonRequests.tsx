import React from "react";
import { Button, Typography, Input, ConfigProvider, theme } from "antd";
import {
  ShopOutlined,
} from "@ant-design/icons";
import { salonsRequests } from "../../utills/salonsRequests";
const { Title } = Typography;
const { Search } = Input;
const ManageSalonRequests: React.FC = () => {
  return (
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
      <div className="flex flex-col bg-[#161a22] ml-15 md:ml-54 w-full min-h-screen">
        <div className="p-5 flex flex-col gap-10">
          <div className="">
            <Title style={{ color: "#e5e7eb" }} level={3}>
              Requests
            </Title>
            <Search placeholder="Enter Salon Name " className="dark-search" />

            <div className="flex flex-col gap-3 py-5 max-h-198 overflow-y-auto overflow-x-hidden px-2">
              {salonsRequests.map((data, index) => (
                <div
                  key={index}
                  className="flex gap-2 w-full border rounded-xl p-5 justify-between hover:border-[#6c5ce7]"
                  style={{ borderColor: "#555" }}
                >
                  <h2 className="text-2xl text-white font-bold flex items-center gap-2">
                    <ShopOutlined className="text-xl" />
                    <span>{data.salonName}</span>
                  </h2>

                  <div className="flex gap-5 items-center">
                    <Button
                      type="default"
                      style={{
                        color: "#32cd32",
                        borderRadius: "12px",
                        borderColor: "#161a22",
                        padding: "2px 12px",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => (
                        (e.currentTarget.style.color = "#22c55e"),
                        (e.currentTarget.style.borderColor = "#22c55e80")
                      )}
                      onMouseLeave={(e) => (
                        (e.currentTarget.style.color = "#32cd32"),
                        (e.currentTarget.style.borderColor = "#161a22")
                      )}
                    >
                      Approve
                    </Button>

                    <Button
                      type="default"
                      style={{
                        color: "#f87171",
                        borderRadius: "12px",
                        borderColor: "#161a22",
                        padding: "2px 12px",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => (
                        (e.currentTarget.style.color = "#ef4444"),
                        (e.currentTarget.style.borderColor = "#ef444480")
                      )}
                      onMouseLeave={(e) => (
                        (e.currentTarget.style.color = "#f87171"),
                        (e.currentTarget.style.borderColor = "#161a22")
                      )}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ManageSalonRequests;
