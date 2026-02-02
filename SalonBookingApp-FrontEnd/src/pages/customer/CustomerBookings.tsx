import React, { useMemo } from "react";
import { Button, Table, Tag, ConfigProvider, theme } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppstoreAddOutlined } from "@ant-design/icons";

type BookingRow = {
  key: string;
  salon: string;
  employee: string;
  services: string[];
  date: string;
  time: string;
  duration: string;
  status: "Pending" | "Confirmed" | "Cancelled";
};

const CustomerBookings: React.FC = () => {
  const bookings: BookingRow[] = [
    {
      key: "1",
      salon: "Glamour Studio",
      employee: "Rohit",
      services: ["Haircut", "Beard"],
      date: "2026-01-30",
      time: "10:30 AM",
      duration: "45 min",
      status: "Confirmed",
    },
    {
      key: "2",
      salon: "Elite Hair",
      employee: "Neha",
      services: ["Facial"],
      date: "2026-02-02",
      time: "01:00 PM",
      duration: "30 min",
      status: "Pending",
    },
    {
      key: "3",
      salon: "Urban Styles",
      employee: "Amit",
      services: ["Hair Spa", "Massage"],
      date: "2026-02-05",
      time: "04:15 PM",
      duration: "60 min",
      status: "Cancelled",
    },
  ];

  const columns: ColumnsType<BookingRow> = useMemo(
    () => [
      {
        title: "Salon",
        dataIndex: "salon",
        key: "salon",
        render: (v) => <span className="text-white font-semibold">{v}</span>,
      },
      {
        title: "Employee",
        dataIndex: "employee",
        key: "employee",
        render: (v) => <span className="text-white/80">{v}</span>,
      },
      {
        title: "Services",
        dataIndex: "services",
        key: "services",
        render: (services: string[]) => (
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <Tag key={s} rootClassName="!rounded-full !px-3" color="purple">
                {s}
              </Tag>
            ))}
          </div>
        ),
      },
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Time", dataIndex: "time", key: "time" },
      { title: "Duration", dataIndex: "duration", key: "duration" },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: BookingRow["status"]) => {
          if (status === "Confirmed") return <Tag color="green" rootClassName="!rounded-full">Confirmed</Tag>;
          if (status === "Pending") return <Tag color="gold" rootClassName="!rounded-full">Pending</Tag>;
          return <Tag color="red" rootClassName="!rounded-full">Cancelled</Tag>;
        },
      },
    ],
    [],
  );

  return (
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
      <div className="text-white">
        <div className="px-4 lg:px-8 py-6 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-[#0F1422] p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">My Bookings</h1>
              <p className="text-sm text-white/60 mt-1">
                View all your appointments in one place.
              </p>
            </div>

            <Button
              onClick={() => (window.location.href = "/customer")}
              icon={<AppstoreAddOutlined />}
              rootClassName="!h-11 !rounded-2xl !bg-[#6D5EF1] !border-[#6D5EF1] !text-white hover:!bg-[#5B4BEE]"
            >
              New Booking
            </Button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0F1422] p-4 lg:p-6">
            <Table
              columns={columns}
              dataSource={bookings}
              pagination={{ pageSize: 6 }}
              className="customer-booking-table"
            />

            <style>{`
            .customer-booking-table .ant-table {
              background: transparent !important;
              color: rgba(255,255,255,0.85) !important;
            }
            .customer-booking-table .ant-table-thead > tr > th {
              background: rgba(255,255,255,0.04) !important;
              color: rgba(255,255,255,0.75) !important;
              border-bottom: 1px solid rgba(255,255,255,0.08) !important;
            }
            .customer-booking-table .ant-table-tbody > tr > td {
              background: transparent !important;
              border-bottom: 1px solid rgba(255,255,255,0.06) !important;
              color: rgba(255,255,255,0.82) !important;
            }
            .customer-booking-table .ant-table-tbody > tr:hover > td{
              background: rgba(255,255,255,0.04) !important;
            }
            .customer-booking-table .ant-pagination .ant-pagination-item a {
              color: rgba(255,255,255,0.75) !important;
            }
            .customer-booking-table .ant-pagination .ant-pagination-item-active a {
              color: white !important;
            }
          `}</style>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default CustomerBookings;
