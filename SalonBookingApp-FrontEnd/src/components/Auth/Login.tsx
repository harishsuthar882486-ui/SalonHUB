import React, { useEffect, useState } from "react";
import { Button, Input, Divider, ConfigProvider, theme } from "antd";
import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone, ArrowLeftOutlined, AppstoreOutlined, UserAddOutlined, } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<{
    fullName: string;
    userEmail: string;
    password: string;
  } | null>({ fullName: "", userEmail: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/customer")
      // window.location.href = "/customer";
    }, 900);
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3200/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    const role = data.user.role;
    console.log(data.user.role)
    if (data.success) {
      console.log("User authenticated successfully!");

      document.cookie = "token=" + data.token;
      setTimeout(() => {
        localStorage.setItem("fullName", data.user.fullName);
        localStorage.setItem("email", data.user.userEmail);
        localStorage.setItem("phone", data.user.phone);
        localStorage.setItem("loggedIn", "true");
        if(role === "customer"){
          navigate("/customer");
        }else if(role === "salonadmin"){
          navigate("/salonadmin")
        }else if(role === "superadmin"){
          navigate("/superadmin")
        }else if(role === "employee"){
          navigate("/employee")
        }
      }, 1000);
    } else {
      console.log("Invalid credentials! Please Sign Up and try again.");
      setTimeout(() => {
        console.log("");
      }, 3000);
    }
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("login");
    if (loggedInUser) {
      navigate("/customer");
      return;
    }
  });
  return (
    <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>

      <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-115">
          <button
            onClick={() => window.history.back()}
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
          >
            <ArrowLeftOutlined />
            Back
          </button>

          <div className="rounded-3xl border border-white/10 bg-[#0F1422] p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-[#6D5EF1] flex items-center justify-center">
                <AppstoreOutlined className="text-white text-lg" />
              </div>
              <div>
                <div className="text-lg font-bold leading-5">SalonHub</div>
                <div className="text-xs text-white/50">Booking System</div>
              </div>
            </div>

            <h1 className="mt-6 text-2xl font-bold">Login</h1>
            <p className="mt-1 text-sm text-white/60">
              Login to manage bookings, employees & services.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs text-white/60">Email</label>
                <Input
                  size="large"
                  name="password"
                  required
                  placeholder="Enter your email"
                  prefix={<MailOutlined className="text-white/50" />}
                  rootClassName="mt-2 !h-11 !rounded-2xl !bg-[#0B0F19] !border-white/10 !text-white placeholder:!text-white/30"
                  onChange={(e)=>setUserData({...(userData || { fullName: "", userEmail: "", password: "" }), userEmail: e.target.value,})}
                />
              </div>

              <div>
                <label className="text-xs text-white/60">Password</label>
                <Input.Password
                  size="large"
                  required
                  placeholder="Enter your password"
                  prefix={<LockOutlined className="text-white/50" />}
                  iconRender={(visible: unknown) =>
                    visible ? (
                      <EyeTwoTone />
                    ) : (
                      <EyeInvisibleOutlined className="text-white/50" />
                    )
                  }
                  onChange={(e)=>setUserData({...(userData || { fullName: "", userEmail: "", password: "" }), password: e.target.value,})}
                  rootClassName="mt-2 !h-11 !rounded-2xl !bg-[#0B0F19] !border-white/10 !text-white placeholder:!text-white/30"
                />
              </div>

              <Button
                htmlType="submit"
                loading={loading}
                rootClassName="w-full !h-11 !rounded-2xl !bg-[#6D5EF1] !border-[#6D5EF1] !text-white hover:!bg-[#5B4BEE]"
                onClick={handleLogin}
              >
                Login
              </Button>
            </form>

            <Divider rootClassName="!border-white/10 !text-white/40">OR</Divider>

            <Button
              onClick={() => navigate("/signup")}
              icon={<UserAddOutlined />}
              rootClassName="w-full !h-11 !rounded-2xl !border-white/10 !bg-white/5 !text-white hover:!bg-white/10"
            >
              Create new account
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

export default Login;
