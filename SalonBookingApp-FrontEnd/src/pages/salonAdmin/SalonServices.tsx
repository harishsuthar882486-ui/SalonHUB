import React, { useEffect, useState } from "react";
import { Button, Switch, Tag, Form, Input, ConfigProvider, theme } from "antd";
import type { FormProps } from "antd";
import {
  EditOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Services } from "../../utills/salonAdmin/services";

type Service = {
  id: number;
  title: string;
  duration: string;
  price: number;
  currency: string;
  defaultActive: boolean;
};

const { Search } = Input;

const SalonServices: React.FC = () => {
  const [serviceState, setServiceState] = useState<Record<number, boolean>>({});
  const [addService, setAddService] = useState(false);

  const onFinish: FormProps["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const initial: Record<number, boolean> = {};
    (Services as Service[]).forEach((s) => {
      initial[s.id] = s.defaultActive;
    });
    setServiceState(initial);
  }, []);

  const toggleService = (id: number, checked: boolean) => {
    setServiceState((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <main className="bg-[#161a22] w-full min-h-screen ml-15 md:ml-54 p-3 md:p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="w-full md:w-auto">
            <h1 className="text-gray-200 text-xl md:text-2xl font-bold">
              Services Management
            </h1>
            <p className="text-gray-400 text-xs md:text-sm font-semibold mb-3">
              Manage your salon services and pricing
            </p>

            <div className="w-full md:w-80">
              <Search placeholder="Enter Service Name " className="dark-search" />
            </div>
          </div>

          <div className="flex w-full md:w-auto">
            <button
              className="bg-[#6c5ce7] text-white px-4 flex items-center justify-center gap-2 h-10 rounded-2xl w-full md:w-auto"
              onClick={() => setAddService(true)}
            >
              <PlusOutlined />
              Add Service
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 max-h-[calc(100vh-220px)] overflow-y-auto overflow-x-hidden pb-2">
          {(Services as Service[]).map((data) => {
            const active = serviceState[data.id] ?? data.defaultActive;

            return (
              <div
                key={data.id}
                className="w-full rounded-2xl border border-[#6c5ce7]/50 bg-[#111827] shadow-xl p-4 md:p-5 flex flex-col gap-5 min-h-55"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-2 min-w-0">
                    <h2 className="text-white text-xl md:text-2xl font-semibold leading-none truncate">
                      {data.title}
                    </h2>

                    <Tag
                      color={active ? "green" : "red"}
                      rootClassName="w-fit !rounded-full !px-3 !pb-0.5 font-semibold"
                    >
                      {active ? "Active" : "Inactive"}
                    </Tag>
                  </div>

                  <Button
                    type="default"
                    icon={<EditOutlined />}
                    style={{
                      backgroundColor: "#0b1220",
                      color: "gray",
                      border: "1px solid gray",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 text-[#9ca3af] font-medium">
                    <ClockCircleOutlined className="text-lg" />
                    <span>{data.duration}</span>
                  </div>

                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-white text-2xl md:text-3xl font-bold">
                      {data.currency} {data.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#9ca3af] font-medium">Toggle Status</span>
                  <Switch
                    checked={active}
                    onChange={(checked) => toggleService(data.id, checked)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {addService && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-3 md:p-4 z-50">
            <div className="bg-[#111827] p-4 md:p-6 rounded-md w-full max-w-lg relative text-gray-200 flex flex-col">
              <span
                className="absolute right-5 top-4 text-gray-400 hover:text-gray-500 duration-200 cursor-pointer"
                onClick={() => setAddService(false)}
              >
                <CloseOutlined />
              </span>

              <h2 className="text-base md:text-lg font-semibold">
                Add New Service
              </h2>
              <p className="mb-4 text-sm md:text-base">
                Add a new service to your salon.
              </p>

              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  label={<span className="text-white">Service Name</span>}
                  required
                  name="title"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={<span className="text-white">Duration (minutes)</span>}
                  required
                  name="duration"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={<span className="text-white">Price (₹)</span>}
                  name="price"
                  required
                >
                  <Input />
                </Form.Item>

                <Form.Item label={null} className="mb-0">
                  <Button type="primary" htmlType="submit" className="w-full">
                    Create Service
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        )}
      </main>
    </ConfigProvider>
  );
};

export default SalonServices;
