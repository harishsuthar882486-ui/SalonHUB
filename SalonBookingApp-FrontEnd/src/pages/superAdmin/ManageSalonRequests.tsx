import React, { useEffect, useMemo, useState } from "react";
import { Button, Typography, Input, ConfigProvider, theme } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import { type SalonsDatatype } from "../../utills/salons";
const { Title } = Typography;
const { Search } = Input;
const ManageSalonRequests: React.FC = () => {
  const [salonsRequests, setSalonsRequests] = useState<SalonsDatatype[]>([]);
  const [viewDetails, setViewDetails] = useState(false);
  const [salonKey, setSalonkey] = useState("");

  const selectedSalon = useMemo(() => {
    return salonsRequests.find((s: SalonsDatatype) => s._id === salonKey);
  }, [salonKey, salonsRequests]);

  const getRequests = async () => {
    const response = await fetch("http://localhost:3200/salons/requests");
    const list = await response.json();
    const requests = list.result;
    setSalonsRequests(requests);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getRequests();
  }, []);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
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
                      onClick={() => (
                        setViewDetails(true),
                        setSalonkey(data._id)
                      )}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {viewDetails && (
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setViewDetails(false)}
          />
          <main
            className={`fixed z-50 top-20 right-0 h-[calc(100vh-5rem)] w-130 max-w-[92vw] transform transition-transform duration-500 ease-in-out ${
              viewDetails ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full rounded-3xl border border-white/10 bg-[#0F1422] p-6 overflow-y-auto flex flex-col justify-between">
              <div className="text-gray-300 flex flex-col gap-3">
                <h1 className="text-3xl">
                  {selectedSalon?.salonName}{" "}
                  <span className="text-sm">({selectedSalon?.category})</span>
                </h1>
                <p className="text-sm ">
                  {selectedSalon?.fullAddress} {selectedSalon?.city}
                </p>
                <p>{selectedSalon?.salonEmail}</p>
                <p>{selectedSalon?.phone}</p>
                <p>{selectedSalon?.fullName}</p>
                <p>{selectedSalon?.salonEmail}</p>
              </div>
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
          </main>
        </ConfigProvider>
      )}
    </ConfigProvider>
  );
};

export default ManageSalonRequests;

