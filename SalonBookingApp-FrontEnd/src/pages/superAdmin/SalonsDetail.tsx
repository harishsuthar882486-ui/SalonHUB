import { Layout, Card, Row, Col, Typography, Space ,Input, type MenuProps, Dropdown, Button, Menu, ConfigProvider, theme } from "antd";
import { HomeOutlined, TeamOutlined, ToolOutlined } from "@ant-design/icons";
import { MoreOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import type { SalonsDatatype } from "../../utills/salons";

const { Content } = Layout;
const { Title, Text } = Typography;
const {Search} = Input;

const dropdownStyle: React.CSSProperties = { 
  position: 'absolute',
  top: 24,
  right: 24,
  zIndex: 10,
  background: "#242a35",
  padding: '4px',
  borderRadius: 8,
  border: '1px solid #262b3a',
};

const SalonsDetail = () => {
    const [SalonDetails, setSalonDetails] = useState<SalonsDatatype[]>([]);

  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: 'Edit',
      danger: false,
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true,
    },
  ];
  const getData = async () => {
    const response = await fetch("http://localhost:3200/salons");
    const list = await response.json();
    const users = list.result;
    setSalonDetails(users);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getData();
  }, []);
  return (
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>

      <div className="ml-15 md:ml-54 bg-[#161a22] min-h-screen">
        <Content className="p-5">
          <Space orientation="vertical" style={{ width: "100%", display: 'flex', flexDirection: 'column' }}>
            <div className="">
              <Title style={{ color: "#e5e7eb",}} level={3} >
                Salons
              </Title>
              <Search placeholder="Enter Salon Name " className="dark-search mb-5"/>
              <div className="max-h-198 overflow-y-auto overflow-x-hidden px-2">
                <Row gutter={[24, 32]} >
                  {SalonDetails.map((data, index) => (
                    <Col key={index} xs={24} sm={24} md={12} lg={10} xl={8} >
                      <Card
                        style={{
                          backgroundColor: "#242a35",
                          border: "1px solid #262b3a",
                          borderRadius: 16,
                          height: "100%",
                        }}
                      > 
                        <div style={dropdownStyle}>
                          <Dropdown
                            popupRender={() => (
                              <Menu
                                theme="dark"
                                items={items}
                                style={{ background: '#242a35', border: '1px solid #262b3a', color: 'white' }}
                              />
                            )}
                            trigger={['click']}
                          >
                            <Button type="text" icon={<MoreOutlined className="text-2xl bg-[#1e2036] p-2.5 rounded-xl " style={{color: '#6c5ce7'}}/>} />
                          </Dropdown>
                        </div>
                        <div className="border-b border-b-[#9ca3af] pb-4 mb-4">
                          <HomeOutlined
                            style={{
                              fontSize: 22,
                              backgroundColor: "#1e2036",
                              color: "#6c5ce7",
                              padding: 10,
                              borderRadius: 12,
                              marginBottom: 12,
                            }}
                          />

                          <Title level={3} style={{ color: "#f9fafb" }}>
                            {data.salonName}
                          </Title>

                          <Text style={{ color: "#9ca3af", display: "block" }}>
                            {data.salonEmail}
                          </Text>
                          <Text style={{ color: "#9ca3af" }}>
                            {data.salonContact}
                          </Text>
                        </div>

                        <Space size={32}>
                          <Space>
                            <ToolOutlined
                              style={{ color: "#9ca3af", fontSize: 18 }}
                            />
                            <Text
                              style={{
                                color: "#f9fafb",
                                fontSize: 18,
                                fontWeight: 600,
                              }}
                            >
                              {data.salonServices}
                            </Text>
                          </Space>

                          <Space>
                            <TeamOutlined
                              style={{ color: "#9ca3af", fontSize: 18 }}
                            />
                            <Text
                              style={{
                                color: "#f9fafb",
                                fontSize: 18,
                                fontWeight: 600,
                              }}
                            >
                              {data.salonStaff}
                            </Text>
                          </Space>
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </Space>
        </Content>

      </div>
    </ConfigProvider>
  );
};

export default SalonsDetail;
