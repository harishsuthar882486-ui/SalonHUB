import React, { useState } from "react";
import { Button, Divider, ConfigProvider, Segmented, theme } from "antd";
import { ArrowLeftOutlined, AppstoreOutlined, LoginOutlined} from "@ant-design/icons";

import SalonAdminRegister from "../salonAdmin/SalonAdminRegister";
import SignnUp from "../Sign-up";

const SignUp: React.FC = () => {
//   const [loading, setLoading] = useState(false);
  const [view, setView] = useState("customer");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       window.location.href = "/login";
//     }, 900);
//   };

  return (
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>

      <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center px-4 pt-5">
        <div className={`w-full max-w-150`}>
          <button
            onClick={() => window.history.back()}
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
          >
            <ArrowLeftOutlined />
            Back
          </button>

          <div className="rounded-3xl border border-white/10 bg-[#0F1422] p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-2xl bg-[#6D5EF1] flex items-center justify-center">
                <AppstoreOutlined className="text-white text-lg" />
              </div>
              <div>
                <div className="text-lg font-bold leading-5">SalonHub</div>
                <div className="text-xs text-white/50">Booking System</div>
              </div>
            </div>
            <Segmented
                options={[
                    { label: "Customer Register", value: "customer" },
                    { label: "Salon Admin Register", value: "salonAdmin" },
                ]}
                value={view}
                onChange={setView}
                className="segmented-gap"
            />
            {view === "customer" && (
            <SignnUp/>
            )}
            {view === "salonAdmin" && (
                <SalonAdminRegister/>
            )}
            

            <Divider rootClassName="!border-white/10 !text-white/40">Already have account?</Divider>

            <Button
              onClick={() => (window.location.href = "/login")}
              icon={<LoginOutlined />}
              rootClassName="w-full !h-11 !rounded-2xl !border-white/10 !bg-white/5 !text-white hover:!bg-white/10"
            >
              Login
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-white/35">
            © {new Date().getFullYear()} SalonHub • All rights reserved
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default SignUp;
