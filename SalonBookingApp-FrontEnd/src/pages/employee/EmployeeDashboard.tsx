import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { empDashData } from "../../utills/employee/empData";
import { Row, Col, Card } from "antd";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { MinusOutlined } from "@ant-design/icons";

const EmployeeDashboard = () => {
  return (
    <main className="bg-[#161a22] w-full min-h-screen ml-15 md:ml-54 p-3 md:p-5 flex flex-col gap-3">
      <div className="">
        <h1 className="text-gray-200 text-xl md:text-2xl font-bold">
          Bookings Management
        </h1>
        <p className="text-gray-400 text-xs md:text-sm font-semibold">
          View and manage all salon bookings
        </p>
      </div>

      <Row gutter={[16, 16]} justify="center">
        {empDashData.map((data, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card
              className="rounded-xl"
              style={{ backgroundColor: "#242a35", borderColor: "#262b3a" }}
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-gray-400 text-sm md:text-base">
                  {data.heading}
                </h2>
                <span className="text-2xl md:text-3xl font-bold text-gray-100">
                  {data.total}
                </span>
              </div>

              <FontAwesomeIcon
                className="absolute top-4 md:top-6 right-4 md:right-6 text-lg md:text-xl bg-[#1e2036] text-[#6c5ce7] p-2.5 rounded-xl"
                icon={data.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div className="flex flex-col gap-6 md:gap-10 rounded-2xl border border-[#262b3a] p-4 md:p-5 min-h-125">
        <h1 className="text-lg md:text-xl font-semibold text-gray-200">
          Today's Schedule
        </h1>
      </div>

      <div className="flex flex-col gap-6 md:gap-10 rounded-2xl border border-[#262b3a] p-4 md:p-5 min-h-50">
        <h1 className="text-lg md:text-xl font-semibold text-gray-200">
          Your Working Hours Today
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 items-center sm:items-stretch">
          <div className="bg-[#1c2230] h-20 w-full sm:w-50 flex items-center gap-4 px-5 md:px-7 rounded-2xl">
            <FontAwesomeIcon
              icon={faClock}
              className="text-[#6c5ce7] text-2xl md:text-3xl"
            />
            <h2>
              <p className="text-gray-300 text-sm md:text-base">Start Time</p>
              <p className="text-white text-lg md:text-xl font-bold">9:00</p>
            </h2>
          </div>

          <h2 className="text-xl md:text-2xl text-[#1c2230] font-bold rotate-90 sm:rotate-0">
            <MinusOutlined />
          </h2>

          <div className="bg-[#1c2230] h-20 w-full sm:w-50 flex items-center gap-4 px-5 md:px-7 rounded-2xl">
            <FontAwesomeIcon
              icon={faClock}
              className="text-[#6c5ce7] text-2xl md:text-3xl"
            />
            <h2>
              <p className="text-gray-300 text-sm md:text-base">End Time</p>
              <p className="text-white text-lg md:text-xl font-bold">18:00</p>
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmployeeDashboard;
