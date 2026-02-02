import { useState } from "react";
import {
  Space,
  Typography,
  Tag,
  Divider,
  Switch,
  Button,
  Row,
  Col,
  ConfigProvider,
  theme,
  Form,
  Input,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { staff as staffData } from "../../utills/salonAdmin/staff";

const { Search } = Input;
const { Text, Title } = Typography;

const SalonStaff = () => {
  const [staff, setStaff] = useState(staffData);
  const [addStaff, setAddStaff] = useState(false);

  const toggleActive = (index: number, checked: boolean) => {
    setStaff((prev) =>
      prev.map((item, i) => (i === index ? { ...item, active: checked } : item)),
    );
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <main className="bg-[#161a22] w-full min-h-screen ml-15 md:ml-54 p-3 md:p-5 flex flex-col gap-3">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="w-full">
            <h1 className="text-gray-200 text-xl md:text-2xl font-bold">
              Staff Management
            </h1>
            <p className="text-gray-400 text-xs md:text-sm font-semibold">
              Manage your team members and their services
            </p>

            <div className="mt-3 w-full md:w-80">
              <Search className="dark-search w-full" />
            </div>
          </div>

          <div className="flex w-full md:w-auto">
            <button
              className="bg-[#6c5ce7] text-white px-4 flex items-center justify-center gap-2 h-10 rounded-2xl w-full md:w-auto"
              onClick={() => setAddStaff(true)}
            >
              <PlusOutlined />
              Add Staff
            </button>
          </div>
        </div>

        <div className="max-h-[calc(100vh-190px)] md:h-198 overflow-y-auto overflow-x-hidden pr-1">
          <Row gutter={[16, 16]} >
            {staff.map((data, index) => (
              <Col key={index} xs={24} sm={24} md={12} lg={10} xl={8}>
                <div className="p-4 md:p-5 rounded-2xl bg-[#0f172a] border border-[#262b3a] shadow-2xl mb-2 md:mb-5">
                  <Space
                    align="start"
                    style={{ width: "100%", justifyContent: "space-between" }}
                  >
                    <Space align="start" size={14}>
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 999,
                          background: "rgba(108,92,231,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <UserOutlined style={{ fontSize: 20, color: "#6c5ce7" }} />
                      </div>

                      <Space direction="vertical" size={6}>
                        <Title
                          level={4}
                          style={{
                            margin: 0,
                            color: "white",
                            maxWidth: 190,
                          }}
                          className="truncate"
                        >
                          {data.empName}
                        </Title>

                        <Tag
                          color={data.active ? "green" : "default"}
                          style={{
                            width: "fit-content",
                            borderRadius: 999,
                            fontWeight: 600,
                            margin: 0,
                          }}
                        >
                          {data.active ? "Active" : "Inactive"}
                        </Tag>
                      </Space>
                    </Space>

                    <Button
                      type="default"
                      shape="circle"
                      icon={<EditOutlined />}
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "white",
                      }}
                    />
                  </Space>

                  <Divider style={{ borderColor: "rgba(255,255,255,0.08)" }} />

                  <Space direction="vertical" size={10} className="w-full">
                    <Space size={10} className="w-full">
                      <MailOutlined style={{ color: "rgba(255,255,255,0.55)" }} />
                      <Text
                        style={{ color: "rgba(255,255,255,0.70)" }}
                        className="break-all"
                      >
                        {data.empEmail}
                      </Text>
                    </Space>

                    <Space size={10} className="w-full">
                      <PhoneOutlined style={{ color: "rgba(255,255,255,0.55)" }} />
                      <Text style={{ color: "rgba(255,255,255,0.70)" }}>
                        {data.phone}
                      </Text>
                    </Space>
                  </Space>

                  <Divider style={{ borderColor: "rgba(255,255,255,0.08)" }} />

                  <Text style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>
                    Assigned Services
                  </Text>

                  <div style={{ marginTop: 12 }}>
                    <Space size={[10, 10]} wrap>
                      {data.services.map((service: string) => (
                        <Tag
                          key={service}
                          style={{
                            borderRadius: 999,
                            padding: "4px 12px",
                            background: "rgba(108,92,231,0.15)",
                            border: "1px solid rgba(108,92,231,0.25)",
                            color: "#6c5ce7",
                            fontWeight: 600,
                            margin: 0,
                          }}
                        >
                          {service}
                        </Tag>
                      ))}
                    </Space>
                  </div>

                  <Divider style={{ borderColor: "rgba(255,255,255,0.08)" }} />

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Space size={10}>
                      <Switch
                        checked={data.active}
                        onChange={(checked) => toggleActive(index, checked)}
                      />
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          fontWeight: 600,
                        }}
                      >
                        Active
                      </Text>
                    </Space>

                    <Button
                      className="w-full sm:w-auto"
                      style={{
                        borderRadius: 12,
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "white",
                        paddingInline: 18,
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {addStaff && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-3 md:p-4 z-50">
            <div className="bg-[#111827] p-4 md:p-6 rounded-md w-full max-w-lg relative text-gray-200 flex flex-col">
              <span
                className="absolute right-5 top-4 text-gray-400 hover:text-gray-500 duration-200 cursor-pointer"
                onClick={() => setAddStaff(false)}
              >
                <CloseOutlined />
              </span>

              <h2 className="text-base md:text-lg font-semibold ">
                Add New Employee
              </h2>
              <p className="mb-4 text-sm md:text-base">
                Enter the details of the new employee.
              </p>

              <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  label={<span className="text-white">Full Name</span>}
                  required
                  name="title"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={<span className="text-white">Email</span>}
                  required
                  name="duration"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={<span className="text-white">Phone</span>}
                  name="price"
                  required
                >
                  <Input />
                </Form.Item>

                <Form.Item label={null} className="mb-0">
                  <Button type="primary" htmlType="submit" className="w-full">
                    Create Employee
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

export default SalonStaff;
