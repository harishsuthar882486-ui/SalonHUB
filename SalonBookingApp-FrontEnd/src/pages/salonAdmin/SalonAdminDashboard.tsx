import React from "react";
import { Row, Col, Card, Table, ConfigProvider, theme } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { salAdmDash } from "../../utills/salonAdmin/datas";
import { Services } from "../../utills/salonAdmin/services";
import { staff } from "../../utills/salonAdmin/staff";

const columns = [
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Employee",
    dataIndex: "employee",
    key: "employee",
  },
  {
    title: "Services",
    dataIndex: "services",
    key: "services",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const SalonAdminDashboard: React.FC = () => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <main className="bg-[#161a22] w-full ml-15 md:ml-54 p-5 flex flex-col gap-3">
        <div className="flex flex-col">
          <h1 className="text-gray-200 text-2xl font-bold">
            Salon Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm font-semibold">
            Welcome back! Here's your salon overview
          </p>
        </div>

        <Row gutter={[32, 32]} justify="center">
          {salAdmDash.map((data, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                className="rounded-xl"
                style={{ backgroundColor: "#242a35", borderColor: "#262b3a" }}
              >
                <div>
                  <h2 className="text-gray-400 text-sm">{data.heading}</h2>
                  <span className="text-2xl font-bold text-gray-100">
                    {data.total}
                  </span>
                  <p className="text-green-500">{data.growth}</p>
                </div>

                <FontAwesomeIcon
                  className="absolute top-6 right-6 text-xl bg-[#1e2036] text-[#6c5ce7] p-2.5 rounded-xl"
                  icon={data.icon}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <div className="flex gap-2 w-full">
          <div className="border border-[#262b3a] bg-[#161a22] w-full rounded-xl h-80 overflow-y-auto p-5">
            <h1 className="text-white text-xl font-semibold">
              Popular Services
            </h1>
            <div className="flex flex-col gap-3 mt-5">
              {Services.map((data, index) => (
                <div
                  className="rounded-xl bg-[#1e2036] flex justify-between px-5 py-2 items-center"
                  key={index}
                >
                  <div className="">
                    <h2 className="text-lg font-light text-white">
                      {data.title}
                    </h2>
                    <p className="text-gray-400">{data.duration}</p>
                  </div>
                  <div className="">
                    <p className="text-lg font-light text-white">
                      {data.currency}
                      {data.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-[#262b3a] bg-[#161a22] w-full rounded-xl h-80 overflow-y-auto p-5 hidden md:flex md:flex-col">
            <h1 className="text-white text-xl font-semibold">Team Members</h1>
            <div className="flex flex-col gap-3 mt-5">
              {staff.map((data, index) => (
                <div
                  className="  rounded-xl bg-[#1e2036] flex justify-between px-5 py-2 items-center "
                  key={index}
                >
                  <div className="">
                    <h2 className="text-lg font-light text-white">
                      {data.empName}
                    </h2>
                    <p className="text-gray-400">{data.empEmail}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-lg font-light text-white">
                      {data.bookings}
                    </p>
                    <p className="font-extralight text-xs text-gray-400">
                      Bookings
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-2xl border border-[#262b3a] pt-5">
          <h1 className="text-2xl font-semibold text-gray-200 ml-5">
            Today's Bookings
          </h1>
          <span className="text-gray-400 ml-5">27/01/2026</span>
          <div className="mt-5">
            <Table
              columns={columns}
              pagination={{}}
              scroll={{ y: 400 }}
              className="rounded-2xl "
            />
          </div>
        </div>
      </main>
    </ConfigProvider>
  );
};

export default SalonAdminDashboard;
